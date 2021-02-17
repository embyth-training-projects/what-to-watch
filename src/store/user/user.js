import {extend} from "../../helpers/utils";
import {AuthorizationStatus} from "../../helpers/const";

import {ActionCreator as AppActionCreator} from "../app/app";

export const initialState = {
  authorizationStatus: AuthorizationStatus.NOT_AUTH,
  isAuthorizationError: false,
};

export const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  SHOW_AUTHORIZATION_ERROR: `SHOW_AUTHORIZATION_ERROR`,
  CLEAR_AUTHORIZATION_ERROR: `CLEAR_AUTHORIZATION_ERROR`,
};

export const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status,
    };
  },

  showAuthorizationError: () => {
    return {
      type: ActionType.SHOW_AUTHORIZATION_ERROR,
      payload: true,
    };
  },

  clearAuthorizationError: () => {
    return {
      type: ActionType.CLEAR_AUTHORIZATION_ERROR,
      payload: false,
    };
  },
};

export const Operations = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then(() => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      })
      .catch(() => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NOT_AUTH));
      });
  },

  login: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: authData.email,
      password: authData.password,
    })
      .then(() => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
        dispatch(AppActionCreator.goToMainPage());
      })
      .catch(() => {
        dispatch(ActionCreator.showAuthorizationError());
      });
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return extend(state, {
        authorizationStatus: action.payload,
      });

    case ActionType.SHOW_AUTHORIZATION_ERROR:
      return extend(state, {
        isAuthorizationError: action.payload,
      });

    case ActionType.CLEAR_AUTHORIZATION_ERROR:
      return extend(state, {
        isAuthorizationError: action.payload,
      });

    default:
      return state;
  }
};
