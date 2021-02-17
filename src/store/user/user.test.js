import MockAdapter from "axios-mock-adapter";

import {createAPI} from "../../api";

import {initialState, ActionType, ActionCreator, Operations, reducer} from "./user";
import {ActionType as AppActionType} from "../app/app";

import {AuthorizationStatus, Pages} from "../../helpers/const";

const api = createAPI();

describe(`User State Reducer tests`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual(initialState);
  });

  it(`Reducer should update authorizationStatus`, () => {
    expect(reducer({
      authorizationStatus: AuthorizationStatus.NOT_AUTH,
    }, {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH,
    })).toEqual({
      authorizationStatus: AuthorizationStatus.AUTH,
    });

    expect(reducer({
      authorizationStatus: AuthorizationStatus.AUTH,
    }, {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.NOT_AUTH,
    })).toEqual({
      authorizationStatus: AuthorizationStatus.NOT_AUTH,
    });

    expect(reducer({
      authorizationStatus: AuthorizationStatus.AUTH,
    }, {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH,
    })).toEqual({
      authorizationStatus: AuthorizationStatus.AUTH,
    });

    expect(reducer({
      authorizationStatus: AuthorizationStatus.NOT_AUTH,
    }, {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.NOT_AUTH,
    })).toEqual({
      authorizationStatus: AuthorizationStatus.NOT_AUTH,
    });
  });

  it(`Reducer should show Auth Error (isAuthorizationError)`, () => {
    expect(reducer({
      isAuthorizationError: false,
    }, {
      type: ActionType.SHOW_AUTHORIZATION_ERROR,
      payload: true,
    })).toEqual({
      isAuthorizationError: true,
    });
  });

  it(`Reducer should clear Auth Error (isAuthorizationError)`, () => {
    expect(reducer({
      isAuthorizationError: true,
    }, {
      type: ActionType.CLEAR_AUTHORIZATION_ERROR,
      payload: false,
    })).toEqual({
      isAuthorizationError: false,
    });
  });
});

describe(`ActionCreators work correctly`, () => {
  it(`requireAuthorization returns correct action`, () => {
    expect(ActionCreator.requireAuthorization(AuthorizationStatus.NOT_AUTH)).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.NOT_AUTH,
    });

    expect(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH,
    });
  });

  it(`showAuthorizationError returns correct action`, () => {
    expect(ActionCreator.showAuthorizationError()).toEqual({
      type: ActionType.SHOW_AUTHORIZATION_ERROR,
      payload: true,
    });
  });

  it(`clearAuthorizationError returns correct action`, () => {
    expect(ActionCreator.clearAuthorizationError()).toEqual({
      type: ActionType.CLEAR_AUTHORIZATION_ERROR,
      payload: false,
    });
  });
});

describe(`Operations work correctly`, () => {
  const apiMock = new MockAdapter(api);

  it(`Should make a correct API get request to /login`, () => {
    const checkUserAuth = Operations.checkAuth();
    const dispatch = jest.fn();

    apiMock
      .onGet(`/login`)
      .reply(200, {fake: true});

    return checkUserAuth(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH,
        });
      });
  });

  it(`Should make a correct API post request to /login`, () => {
    const authData = {
      email: `test@test.com`,
      password: `fake`,
    };
    const userLogin = Operations.login(authData);
    const dispatch = jest.fn();

    apiMock
      .onPost(`/login`, authData)
      .reply(200, {fake: true});

    return userLogin(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: AppActionType.GO_TO_MAIN_PAGE,
          payload: Pages.MAIN,
        });
      });
  });
});
