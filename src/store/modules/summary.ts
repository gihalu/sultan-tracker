import Vue from 'vue'
import { cloneDeep, fromPairs, get, head, map, max, startCase, tail } from 'lodash'

interface ValueRange {
  majorDimension: string,
  range: string,
  values: string[][]
}

interface ActionParameters {
  commit?: any,
  dispatch?: any,
  getters?: any,
  state: SummaryState
}

class SummaryState {
  googleApiKey: string = 'AIzaSyBF7O9LwZUYDeHRUv9wVRMIfM2CFBIXMFo'
  googleApiUrl: string = 'https://sheets.googleapis.com/v4/spreadsheets/1Y2WXJDgKVFz34fA_jlXkU_Adgxvnnpp-SAUvnwyhZ_M'
  range: string = 'records!A1:Z999'
  summaryData: ValueRange | null = null
}

// initial state
const state = new SummaryState()

// getters
const getters = {

  columnsFromValues: () => (values: string[]) => {
    return map(values, (value, index) => {
      return {
        align: 'left',
        field: value,
        label: index === 0 ? startCase(value) : value,
        name: value,
      }
    })
  },

  gapiResponseDetails: (state: SummaryState, getters: any) => (response: any) => {
    const values = get(response.result, 'values')
    const columns = getters.columnsFromValues(head(values))
    const rows = getters.rowsFromValues(tail(values), columns)
    const details = {
      columns,
      response,
      rows,
    }
    return details
  },

  gapi: () => Vue.prototype.$gapi,

  gapiUrl: (state: SummaryState) => ({ path = 'values', parameters }: {
    path: string, parameters: string
  }) => {
    return `${state.googleApiUrl}/${path}/${encodeURI(parameters)}`
  },

  maxDate: (state: SummaryState, getters: any) => {
    const dates = map(getters.summaryRows, (rows: any) => {
      return rows.date
    })
    return max(dates)
  },

  rowsFromValues: (state: SummaryState) => (values: string[][], columns: { field: string }[]) => {
    return map(values, row => {
      return fromPairs(map(row, (item, index) => {
        return [columns[index]['field'], item]
      }))
    })
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
}

// mutations
const mutations = {
  SetSummaryData: (state: SummaryState, data: ValueRange) => {
    state.summaryData = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}