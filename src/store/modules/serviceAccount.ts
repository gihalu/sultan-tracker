import { get } from "lodash";
import { } from "quasar";
import Axios from "axios";
const jwt = require("jsonwebtoken");

const env: string = process.env.VUE_APP_ENV
const epk: string = process.env.VUE_APP_PRIVATE_KEY
console.log({ epk, env })

export class AccountState {
  accessToken: string | null = null;
  expirationBuffer: number = 120;
  grantType: string = encodeURI("urn:ietf:params:oauth:grant-type:jwt-bearer");
  jwtClaims = {
    iss: "sultan-tracker@appspot.gserviceaccount.com",
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token"
  };
  jwtOptions = {
    algorithm: "RS256",
    expiresIn: "1h",
    header: { alg: "RS256", typ: "JWT" }
  };
  key = epk;
  tokenExpiration: number | null = null;
}

interface ActionParameters {
  commit?: any;
  dispatch?: any;
  getters?: any;
  state: AccountState;
}

// initial state
const state = new AccountState();

// getters
const getters = {
  authorization: (state: AccountState) => {
    return `Bearer ${state.accessToken}`;
  },

  isAuthorized: (state: AccountState, getters: { tokenIsExpired: boolean }) => {
    return Boolean(state.accessToken) && !getters.tokenIsExpired;
  },

  tokenIsExpired: (state: AccountState) => {
    if (!state.tokenExpiration) return true;
    return Number(new Date()) > state.tokenExpiration;
  }
};

// actions
const actions = {
  GetAccessToken: ({ commit, state }: ActionParameters) => {
    const encodedJwt = jwt.sign(state.jwtClaims, state.key, state.jwtOptions);
    const parameters = `grant_type=${state.grantType}&assertion=${encodedJwt}`;

    return Axios.post("https://oauth2.googleapis.com/token", parameters)
      .then(response => {
        const accessToken = get(response.data, "access_token");
        commit("SetAccessToken", accessToken);

        const expiration =
          Number(new Date()) + (get(response.data, "expires_in") - 120) * 1000;
        commit("SetTokenExpiration", expiration);
      })
      .catch(error => {
        console.error("GetAccessToken failed with", { error });
      });
  }
};

// mutations
const mutations = {
  SetAccessToken: (state: AccountState, accessToken: string) => {
    state.accessToken = accessToken;
  },

  SetTokenExpiration: (state: AccountState, exiration: number) => {
    state.tokenExpiration = exiration;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
