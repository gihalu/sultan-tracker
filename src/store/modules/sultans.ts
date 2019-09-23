import { concat, cloneDeep, findIndex, head, tail } from 'lodash'
import { ValueRange } from './gapi'

class SultanState {
  range: string = 'sultans!A1:Z999'
  sultanData: ValueRange | null = null
}

interface ActionParameters {
  commit?: any,
  dispatch?: any,
  getters?: any,
  state: SultanState
}

// initial state
const state = new SultanState()

// getters
const getters = {
  sultanHeaders: (state: SultanState, getters: any) => {
    if (!state.sultanData) return
    const values = state.sultanData.values
    return getters.columnsFromValues(head(values))
  },

  sultans: (state: SultanState, getters: any) => {
    if (!state.sultanData) return
    const values = state.sultanData.values
    return getters.rowsFromValues(tail(values), getters.sultanHeaders)
  }
}

// actions
const actions = {
  AddSultan: ({ commit, dispatch, state }: ActionParameters) => {
    const name = prompt('Please enter the name of the new Sultan')
    if (!name) return
    const newSultan = [name, '1']
    if (!state.sultanData) return
    const sultanValues: string[][] = state.sultanData.values
    const newSultanValues: string[][] = concat(sultanValues, [newSultan])
    commit('SetSultans', newSultanValues)
    dispatch('UpdateSultans')
  },

  GetSultans: ({ commit, getters, state }: ActionParameters) => {
    return getters.gapi.request({
      path: getters.gapiUrl({ parameters: state.range }),
      method: 'GET'
    })
      .then((response: { result: any }) => {
        const data = response.result
        commit('SetSultanData', data)
      })
      .catch((error: any) => console.error({ error }))
  },

  ToggleSultan ({ commit, dispatch, state }: ActionParameters, sultan: { name: string, active: string }) {
    console.log('called', { sultan })
    if (!state.sultanData) return
    const sultanValues: string[][] = cloneDeep(state.sultanData.values)
    const sultanIndex = findIndex(sultanValues, (sultanArray: string[]) => {
      return sultanArray[0] == sultan.name
    })
    const newValue = sultan.active == '1' ? '0' : '1'
    const newSultan = [sultan.name, newValue]
    sultanValues.splice(sultanIndex, 1, newSultan)
    console.log({ newSultan, sultanValues, state })
    commit('SetSultans', sultanValues)
    dispatch('UpdateSultans')
  },
  UpdateSultans: ({ state, getters }: ActionParameters) => {
    return getters.gapi.request({
      path: getters.gapiUrl({ parameters: state.range }),
      method: 'PUT',
      params: {
        valueInputOption: 'RAW',
      },
      body: state.sultanData
    })
      .then((response: any) => console.log({ response }))
      .catch((error: any) => console.error({ error }))
  }
}

// mutations
const mutations = {
  SetSultanData: (state: SultanState, data: ValueRange) => {
    state.sultanData = data
  },
  SetSultans: (state: SultanState, newSultanValues: string[][]) => {
    if (!state.sultanData || !newSultanValues) return
    state.sultanData.values = newSultanValues
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
