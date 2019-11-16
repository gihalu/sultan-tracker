import { assign, compact, concat, cloneDeep, findIndex, head, map, tail } from "lodash"
import { ValueRange } from "./gapi"
import Axios from "axios"

class SultanState {
  range: string = "sultans!A1:Z999"
  sultanData: ValueRange | null = null
}

interface ActionParameters {
  commit?: any
  dispatch?: any
  getters?: any
  rootGetters?: any
  state: SultanState
}

export interface DetailRow {
  current: boolean;
  date: string;
  growth: number | null;
  name: string;
  promoted: boolean;
  score: number;
  tier: string;
}

export interface SultanDetailRow {
  sultan: string;
  detailRows: DetailRow[]
}

// initial state
const state = new SultanState()

// getters
const getters = {

  sultanDetails: (state: SultanState, getters: any, rootState: any, rootGetters: any) => (sultan: { name: string }) => {
    const detailRows = getters.detailRowsBySultan(sultan.name)
    const currentScore = getters.currentScoreBySultan(sultan.name)
    const tier = getters.tier(currentScore)
    return assign({}, sultan, { currentScore, tier, detailRows })
  },

  sultanHeaders: (state: SultanState, getters: any) => {
    if (!state.sultanData) return
    const values = state.sultanData.values
    return getters.columnsFromValues(head(values))
  },

  sultans: (state: SultanState, getters: any) => {
    if (!state.sultanData) return
    const values = state.sultanData.values
    return getters.rowsFromValues(tail(values), getters.sultanHeaders)
  },

  sultanDetailGrid: (state: SultanState, getters: any) => {
    if (!getters.sultans) return
    return compact(map(getters.sultans, sultan => {
      if (!Number(sultan.active)) return
      return getters.sultanDetails(sultan)
    }))
  }
};

// actions
const actions = {
  AddSultan: ({ commit, dispatch, state }: ActionParameters) => {
    const name = prompt("Please enter the name of the new Sultan")
    if (!name) return
    const newSultan = [name, "1"]
    if (!state.sultanData) return
    const sultanValues: string[][] = state.sultanData.values
    const newSultanValues: string[][] = concat(sultanValues, [newSultan])
    commit("SetSultans", newSultanValues)
    dispatch("UpdateSultans")
  },

  GetSultans: ({ commit, rootGetters }: ActionParameters) => {
    const authorization = rootGetters["serviceAccount/authorization"]
    const url = rootGetters.sheetsUrl(state.range)
    return Axios.get(url, { headers: { authorization } })
      .then(response => {
        const data = response.data
        commit("SetSultanData", data)
      })
      .catch((error: any) => console.error({ error }))
  },

  ToggleSultan (
    { commit, dispatch, state }: ActionParameters,
    sultan: { name: string; active: string }
  ) {
    if (!state.sultanData) return;
    const sultanValues: string[][] = cloneDeep(state.sultanData.values)
    const sultanIndex = findIndex(sultanValues, (sultanArray: string[]) => {
      return sultanArray[0] == sultan.name
    });
    const newValue = sultan.active == "1" ? "0" : "1"
    const newSultan = [sultan.name, newValue]
    sultanValues.splice(sultanIndex, 1, newSultan)
    commit("SetSultans", sultanValues)
    dispatch("UpdateSultans")
  },

  UpdateSultans: ({ state, rootGetters }: ActionParameters) => {
    const authorization = rootGetters["serviceAccount/authorization"]
    const url = `${rootGetters.sheetsUrl(state.range)}?valueInputOption=RAW`
    return Axios.put(url, state.sultanData, { headers: { authorization } })
      .catch((error: any) => console.error({ error }))
  }
};

// mutations
const mutations = {
  SetSultanData: (state: SultanState, data: ValueRange) => {
    state.sultanData = data
  },
  SetSultans: (state: SultanState, newSultanValues: string[][]) => {
    if (!state.sultanData || !newSultanValues) return
    state.sultanData.values = newSultanValues
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
