import Vue from 'vue'
import { assign, fromPairs, map, startCase } from 'lodash'


export interface ValueRange {
  majorDimension: string,
  range: string,
  values: string[][]
}

class GapiState {
  apiUrl: string = 'https://sheets.googleapis.com/v4/spreadsheets/1Y2WXJDgKVFz34fA_jlXkU_Adgxvnnpp-SAUvnwyhZ_M'
  range: string = 'records!A1:Z999'
  summaryData: ValueRange | null = null
}

interface ActionParameters {
  commit?: any,
  dispatch?: any,
  getters?: any,
  state: GapiState
}

const state = new GapiState()

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

  gapi: () => Vue.prototype.$gapi,

  gapiUrl: (state: GapiState) => ({ path = 'values', parameters }: {
    path: string, parameters: string
  }) => {
    return `${state.apiUrl}/${path}/${encodeURI(parameters)}`
  },

  rowsFromValues: () => (values: string[][], columns: { field: string }[]) => {
    return map(values, (row, key) => {
      const rowDetails = fromPairs(map(row, (item, index) => {
        return [columns[index]['field'], item]
      }))
      return assign({ key }, rowDetails)
    })
  },

}

const actions = {
}

const mutations = {
}

export default {
  state,
  getters,
  actions,
  mutations
}