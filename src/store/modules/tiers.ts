import { compact, concat, cloneDeep, findIndex, head, inRange, map, tail } from 'lodash'
import { ValueRange } from './gapi'

class TierState {
  range: string = 'tiers!A1:Z999'
  tierData: ValueRange | null = null
}

interface Tier {
  tier: string
  min: string
  max: string
}

interface ActionParameters {
  commit?: any,
  dispatch?: any,
  getters?: any,
  state: TierState
}

// initial state
const state = new TierState()

// getters
const getters = {
  tierHeaders: (state: TierState, getters: any) => {
    if (!state.tierData) return
    const values = state.tierData.values
    return getters.columnsFromValues(head(values))
  },

  tiers: (state: TierState, getters: any) => {
    if (!state.tierData) return
    const values = state.tierData.values
    return getters.rowsFromValues(tail(values), getters.tierHeaders)
  },

  tier: (state: TierState, getters: any) => (score: string) => {
    return head(compact(map(getters.tiers, (tier: Tier) => {
      return inRange(Number(score), Number(tier.min), Number(tier.max)) ? tier.tier : null
    })))
  }
}

// actions
const actions = {

  GetTiers: ({ commit, getters, state }: ActionParameters) => {
    return getters.gapi.request({
      path: getters.gapiUrl({ parameters: state.range }),
      method: 'GET'
    })
      .then((response: { result: any }) => {
        const data = response.result
        commit('SetTierData', data)
      })
      .catch((error: any) => console.error({ error }))
  }
}

// mutations
const mutations = {
  SetTierData: (state: TierState, data: ValueRange) => {
    state.tierData = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
