import { get } from "lodash";
import { } from "quasar";
import Axios from "axios";
const jwt = require("jsonwebtoken");

const epk: string = process.env.PRIVATE_KEY
console.log({ epk })

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
  key: string =
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCWmhyrHroxhB3W\ntH6jG19TcEtJizQXLU3vN9Pej212GR/flt8lSmIkMhYQBKt40FYx1V1Vx8GqJhgP\nm4qisZx2VN1R/egj4OceYak5p7evWxoI5RFwUJhXQc2j8ix+RV/MGyvL98rsZBQ4\nY27JOc9GeLvdNH01yPa7ryd5315Yu8nUY6fXEo7eNUJh4UobOW/qhkgad1/5grre\n0BOQA6oxYNuz9fbs+E6MOzTABz02F+NDGjL3AUgAuZlrpWZVp5pJIMAExNf4CylI\n0BiW7ciPP9D1Vn4+JBLbfK/kMT8K38lnt2MnWfD28DHCraCGqN//pAh5ha8dbxp3\nfRETgWfbAgMBAAECggEAP5hbc805bfBu0zwL39+OrQLV3/v25rScXOBzyN9DJ2Qr\np/SjTTFwaP13gJMgP5emVkvVqoP8XVfRwEF71QDwY62pedag4Qm3PwaZeb2/nL55\nK3ljmEyIUAx7BHie3kF4Vw3APFTqbVFDkp42aaXOR+Fy31Grb/tpaU7o+hdfVVNt\na6jncWG6JlngF75uvPz/ZCA459BW8orLVcvINmFdlpGbLfyn3fKiO9B3J9mKMS69\nT6TBkaQRV9d2VVYCLJ/6r/VOwuEjpTLXIZCNX5mU9pQ3kCEod2wTjHmLhuvHb3UK\nb5DpBZL4fo9vSoDDVGL0xwOZ3GY6iEdkmVQqa1HckQKBgQDGXwVBWvY3K9wQVPj2\nml+R2G4l+J3pxxJo4SvEeGzJIgn+RyALPLZ3XpG9TvNiFCSubKpVHX3t/94b1iBG\nx3mmDh3/IJ20ttswxxd5TqbH6CUGUn7jQH5FPXif924L3aVNdf4ezKntAr/bvFVp\nCpxYF+fZLzrX+QWmWjYwlp7vEQKBgQDCWnhhDVvbACrIPRtBH59jOW0HTRaRQDqV\n/CbEZRakJ+uh0JMr0g2xxACMz9PY9hqSTgCXduEnw+rnm/udtzQd1IHXtKFBrRH6\nWAObQJvz9IFyS9hHooDOd8KPZnQFwnqo5UFulkm0mV1O5d7fIyZoR0UIFRjdo/wb\nFibQEFtAKwKBgBu53DouRIuhjbiap9GP8huobHzSKwAp2uDd2Ag17L6QC2WG+2uW\nqMo2ZZhYGJx0xEu81HHhFWDWimzJmOlLqC0VfAvUuzYu+KPwr888twLp54LitOl+\ncierV9jD9JWj/R6+hy423OlLoRVNVYLBAOkvLjCk8UyOecOuiDRyWPSBAoGAa1ID\n2SvERjlgZnP/wcVRgTwrrXVu+cQq1bmIOrjLeNgmcJM5QWBbeYcO+rKke9DiOVnj\nT8AwcoHoC/8BQUTx/WrkTBWNWjPUkpXZX/icZWjlthSVmHDuiZRuFjtv4+JRU0RN\nDmDk0FpDwRaELFk/kyOPxffIZFNyGg7wXcI6cUMCgYEAr/yb2rD6cZYg77pR9u0f\nvoUQ7rwP39rpfJwMr8kZb86c/hbz0mhG9N+/VckxBDS5PLKb4B9kx6ZQoJwAaDZU\n+lQYJKj5PY/3ZSQeiGV7N6mmlFjJrJXFS+9cG7Za9sZlhUGfZyKXJaTKwzseum3y\ncDECN8YHQMuB8zx0ifr5rtE=\n-----END PRIVATE KEY-----\n";

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
