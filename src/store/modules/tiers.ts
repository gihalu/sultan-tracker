import { compact, head, inRange, map, tail } from 'lodash'
import { ValueRange } from './gapi'
import Axios from 'axios'

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
  rootGetters?: any,
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
      const tierName = inRange(Number(score), Number(tier.min), Number(tier.max)) ? tier.tier : null
      return tierName
    })))
  }
}

// actions
const actions = {

  GetTiers: ({ commit, getters, rootGetters, state }: ActionParameters) => {
    const authorization = rootGetters['serviceAccount/authorization'];
    const url = rootGetters.sheetsUrl(state.range);
    return Axios.get(url, { headers: { authorization } })
      .then(response => {
        const data = response.data;
        commit('SetTierData', data);
      })
      .catch((error: any) => console.error({ error }));
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
