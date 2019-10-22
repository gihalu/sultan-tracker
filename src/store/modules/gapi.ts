import Vue from 'vue'
import { assign, fromPairs, includes, map, startCase } from 'lodash'


export interface ValueRange {
  majorDimension: string,
  range: string,
  values: string[][]
}

interface User {
  email: string,
  firstname: string,
  id: string,
  image: string,
  lastname: string,
  name: string
}
class GapiState {
  admins: string[] = ['gihalu@gmail.com', 'revfer1@gmail.com']
  apiUrl: string = 'https://sheets.googleapis.com/v4/spreadsheets/1ZkSo4IPVwFfqkSNp6ygJfTiL2J6QFg_mU4Srf_TNNvg'
  range: string = 'records!A1:Z999'
  summaryData: ValueRange | null = null
  user: User | null = null
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

  isAdmin: (state: GapiState) => {
    if (state.user === null) return
    return includes(state.admins, state.user.email)
  },

  rowsFromValues: () => (values: string[][], columns: { field: string }[]) => {
    return map(values, (row, key) => {
      const rowDetails = fromPairs(map(row, (item, index) => {
        return [columns[index]['field'], item]
      }))
      return assign({ key }, rowDetails)
    })
  },

  user: (state: GapiState): User | null => state.user

}

const actions = {
}

const mutations = {
  SetUser: (state: GapiState, user: User) => {
    state.user = user
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}