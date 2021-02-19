import {createUser} from "../../adapters";

import {extend} from "../../helpers/utils";
import {AuthorizationStatus, emptyUser} from "../../helpers/const";

export const initialState = {
  userInfo: emptyUser,
  authorizationStatus: AuthorizationStatus.NOT_AUTH,
  isAuthorizationError: false,
  isAuthorizationProcessFinished: false,
};

export const ActionType = {
  SET_AUTHORIZATION_STATUS: `SET_AUTHORIZATION_STATUS`,
  SHOW_AUTHORIZATION_ERROR: `SHOW_AUTHORIZATION_ERROR`,
  CLEAR_AUTHORIZATION_ERROR: `CLEAR_AUTHORIZATION_ERROR`,
  FINISH_AUTHORIZATION_PROCESS: `FINISH_AUTHORIZATION_PROCESS`,
  SET_USER_DATA: `SET_USER_DATA`,
};

export const ActionCreator = {
  setAuthorizationStatus: (status) => {
    return {
      type: ActionType.SET_AUTHORIZATION_STATUS,
      payload: status,
    };
  },

  showAuthorizationError: () => {
    return {
      type: ActionType.SHOW_AUTHORIZATION_ERROR,
      payload: true,
    };
  },

  finishAuthorizationProcess: () => {
    return {
      type: ActionType.FINISH_AUTHORIZATION_PROCESS,
      payload: true,
    };
  },

  clearAuthorizationError: () => {
    return {
      type: ActionType.CLEAR_AUTHORIZATION_ERROR,
      payload: false,
    };
  },

  setUserData: (userData) => {
    return {
      type: ActionType.SET_USER_DATA,
      payload: userData,
    };
  },
};

export const Operations = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then((response) => {
        dispatch(ActionCreator.setAuthorizationStatus(AuthorizationStatus.AUTH));
        dispatch(ActionCreator.setUserData(createUser(response.data)));
      })
      .catch(() => {
        dispatch(ActionCreator.setAuthorizationStatus(AuthorizationStatus.NOT_AUTH));
      })
      .finally(() => {
        dispatch(ActionCreator.finishAuthorizationProcess());
      });
  },

  login: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: authData.email,
      password: authData.password,
    })
      .then((response) => {
        dispatch(ActionCreator.setAuthorizationStatus(AuthorizationStatus.AUTH));
        dispatch(ActionCreator.setUserData(createUser(response.data)));
      })
      .catch(() => {
        dispatch(ActionCreator.showAuthorizationError());
      });
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_AUTHORIZATION_STATUS:
      return extend(state, {
        authorizationStatus: action.payload,
      });

    case ActionType.SHOW_AUTHORIZATION_ERROR:
      return extend(state, {
        isAuthorizationError: action.payload,
      });

    case ActionType.FINISH_AUTHORIZATION_PROCESS:
      return extend(state, {
        isAuthorizationProcessFinished: action.payload,
      });

    case ActionType.CLEAR_AUTHORIZATION_ERROR:
      return extend(state, {
        isAuthorizationError: action.payload,
      });

    case ActionType.SET_USER_DATA:
      return extend(state, {
        userInfo: action.payload,
      });

    default:
      return state;
  }
};
