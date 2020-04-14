import {
  assign,
  compact,
  concat,
  filter,
  find,
  fromPairs,
  get,
  head,
  last,
  map,
  max,
  pick,
  reverse,
  sortBy,
  startCase,
  tail
} from 'lodash'
import { date } from 'quasar'
import { ValueRange } from './gapi'
import Axios from 'axios'

interface ActionParameters {
  commit?: any;
  dispatch?: any;
  getters?: any;
  rootGetters?: any;
  state: SummaryState;
}

export interface summary {
  date: string;
  key: number;
  name: string;
  score: string;
}

export interface SummaryRow {
  date: string;
  name: string;
  score: string;
}

class SummaryState {
  range: string = 'data!A1:Z9999';
  summaryData: ValueRange | null = null;
}

// initial state
const state = new SummaryState()

// getters
const getters = {
  currentScoreBySultan: (state: SummaryState, getters: any) => (sultan: string) => {
    if (!getters.maxDate) return null
    const date = (getters.maxDate as Date).toLocaleDateString()
    const currentSultanRow = find(getters.summaryRows, { date, name: sultan })
    return Number(get(currentSultanRow, 'score', '').replace(/,/g, ''))
  },

  detailRowFromSummaryRow: (state: SummaryState, getters: any) => (summaryRow: SummaryRow) => {
    const baseRow = pick(summaryRow, ['date', 'name'])
    const score = Number(get(summaryRow, 'score', '').replace(/,/g, ''))
    const tier = getters.tier(score)
    const current = (new Date(summaryRow.date)).toLocaleDateString() === (getters.maxDate as Date).toLocaleDateString()
    return assign(baseRow, { current, score, tier })
  },

  detailRowsBySultan: (state: SummaryState, getters: any) => (sultanName: string) => {
    const summaryRows = getters.summaryRowsBySultan(sultanName)

    const baseDetails = map(summaryRows, row => {
      return getters.detailRowFromSummaryRow(row)
    })

    const ascendingRows = sortBy(baseDetails, row => {
      return (new Date(row.date)).valueOf()
    })

    const comparison = {
      score: 0,
      tier: ''
    }
    const detailedRows = map(ascendingRows, (row, index) => {
      const growth = !index ? null : row.score - comparison.score
      comparison.score = row.score
      const promoted = !index ? false : row.tier != comparison.tier
      comparison.tier = row.tier
      return assign({ growth, promoted }, row)
    })

    return detailedRows
  },

  latestScoreBySultan: (state: SummaryState, getters: any) => (
    sultan: string
  ) => {
    const filteredRows = filter(getters.summaryRows, { name: sultan })
    if (!filteredRows.length) return
    const sortedRows = sortBy(filteredRows, row => {
      return new Date(row.date)
    })
    return get(last(sortedRows), 'score')
  },

  maxDate: (state: SummaryState, getters: any) => {
    const dates = map(getters.summaryRows, (rows: any) => {
      return new Date(rows.date)
    })
    return max(dates)
  },

  summaryDateSuggestion: (state: SummaryState, getters: any) => {
    const newDate = date.addToDate(getters.maxDate, { days: 7 })
    return date.formatDate(newDate, 'MM/DD/YYYY')
  },

  summaryHeaders: (state: SummaryState, getters: any) => {
    if (!state.summaryData) return
    const values = state.summaryData.values
    return getters.columnsFromValues(head(values))
  },

  summaryRows: (state: SummaryState, getters: any) => {
    if (!state.summaryData) return
    const values = state.summaryData.values
    return getters.rowsFromValues(tail(values), getters.summaryHeaders)
  },

  summaryRowsBySultan: (state: SummaryState, getters: any) => (sultanName: string) => {
    if (!getters.summaryRows) return
    return filter(getters.summaryRows, { name: sultanName })
  },

  totalUnionPower: (state: SummaryState, getters: any) => { }
}

// actions
const actions = {
  GetSummary: ({ commit, getters, rootGetters, state }: ActionParameters) => {
    const authorization = rootGetters['serviceAccount/authorization']
    const url = rootGetters.sheetsUrl(state.range)
    return Axios.get(url, { headers: { authorization } })
      .then(response => {
        const data = response.data
        commit('SetSummaryData', data)
      })
      .catch((error: any) => console.error({ error }))
  },

  NewSummaryRecords: ({
    commit,
    dispatch,
    getters,
    state
  }: ActionParameters) => {
    const sultans: { name: string; active: boolean }[] = getters.sultans
    const date = prompt(
      'Please enter the date for these records',
      getters.summaryDateSuggestion
    )
    if (!date) return
    const newValues: any = compact(
      map(sultans, sultan => {
        const active: boolean = Boolean(Number(sultan.active))
        if (!active) return
        const score = prompt(
          `Please enter the score for ${sultan.name}`,
          getters.latestScoreBySultan(sultan.name)
        )
        return [sultan.name, date, score]
      })
    )
    if (!state.summaryData) return
    const newSummaryValues = concat(state.summaryData.values, newValues)
    commit('SetSummary', newSummaryValues)
    dispatch('UpdateSummary')
  },

  UpdateSummary: ({ state, getters }: ActionParameters) => {
    return getters.gapi
      .request({
        path: getters.gapiUrl({ parameters: state.range }),
        method: 'PUT',
        params: {
          valueInputOption: 'RAW'
        },
        body: state.summaryData
      })
      .then((response: any) => console.log({ response }))
      .catch((error: any) => console.error({ error }))
  }
}

// mutations
const mutations = {
  SetSummaryData: (state: SummaryState, data: ValueRange) => {
    state.summaryData = data
  },

  SetSummary: (state: SummaryState, newSummaryValues: string[][]) => {
    if (!state.summaryData) return
    state.summaryData.values = newSummaryValues
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
