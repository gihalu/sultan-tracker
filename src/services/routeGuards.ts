import { get } from 'lodash'

class Store {
  commit: any
  dispatch: any
  getters: any
}

export const IsAuthorized = ({ commit, dispatch, getters }: Store) => {
  if (!commit || !dispatch || !getters) {
    console.error(
      "ValidationAthentication failed to find expected store components: please check to ensure that the Vuex store was passed in as the parameter",
      { commit, dispatch, getters }
    );
    return;
  }

  const Validate = (to: string, from: string, next: (path?: string) => {}) => {
    if (getters["serviceAccount/isAuthorized"]) {
      next();
    }
    else {
      dispatch("serviceAccount/GetAccessToken")
        .then(() => {
          next();
        })
    }
  };

  return Validate;
};

export const IsAdmin = ({ commit, dispatch, getters }: Store) => {
  if (!commit || !dispatch || !getters) {
    console.error(
      "ValidationAthentication failed to find expected store components: please check to ensure that the Vuex store was passed in as the parameter",
      { commit, dispatch, getters }
    );
    return;
  }

  const Validate = (to: string, from: string, next: (path?: string) => {}) => {
    if (getters.isAdmin) {
      next();
    }
    else {
      next('/')
    }
  };

  return Validate;
};