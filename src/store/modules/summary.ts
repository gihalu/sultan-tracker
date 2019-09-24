import { compact, concat, filter, fromPairs, get, head, last, map, max, sortBy, startCase, tail } from 'lodash'
import { date } from 'quasar'
import { ValueRange } from './gapi'

interface ActionParameters {
  commit?: any,
  dispatch?: any,
  getters?: any,
  state: SummaryState
}

class SummaryState {
  range: string = 'records!A1:Z999'
  summaryData: ValueRange | null = null
}

// initial state
const state = new SummaryState()

// getters
const getters = {

  latestScoreBySultan: (state: SummaryState, getters: any) => (sultan: string) => {
    const filteredRows = filter(getters.summaryRows, { sultan })
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
  }
}

// actions
const actions = {

  GetSummary: ({ commit, getters, state }: ActionParameters) => {
    return getters.gapi.request({
      path: getters.gapiUrl({ parameters: state.range }),
      method: 'GET'
    })
      .then((response: { result: any }) => {
        const data = response.result
        commit('SetSummaryData', data)
      })
      .catch((error: any) => console.error({ error }))
  },

  NewSummaryRecords: ({ commit, getters, state }: ActionParameters) => {
    const sultans: { name: string, active: boolean }[] = getters.sultans
    const date = prompt('Please enter the date for these records', getters.summaryDateSuggestion)
    if (!date) return
    const newValues: any = compact(map(sultans, sultan => {
      const active: boolean = Boolean(Number(sultan.active))
      if (!active) return
      const score = prompt(`Please enter the score for ${sultan.name}`, getters.latestScoreBySultan(sultan.name))
      return [sultan.name, date, score]
    }))
    if (!state.summaryData) return
    const newSummaryValues = concat(state.summaryData.values, newValues)
    commit('SetSummary', newSummaryValues)
  },
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