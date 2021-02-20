import MockAdapter from "axios-mock-adapter";

import {createAPI} from "../../api";

import {initialState, ActionType, ActionCreator, Operations, reducer} from "./user";

import {createUser} from "../../adapters";
import {AuthorizationStatus} from "../../helpers/const";
import {noop, userMock, serverUser} from "../../helpers/test-data";

const api = createAPI(noop);

describe(`User State Reducer tests`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual(initialState);
  });

  it(`Reducer should update authorizationStatus`, () => {
    expect(reducer({
      authorizationStatus: AuthorizationStatus.NOT_AUTH,
    }, {
      type: ActionType.SET_AUTHORIZATION_STATUS,
      payload: AuthorizationStatus.AUTH,
    })).toEqual({
      authorizationStatus: AuthorizationStatus.AUTH,
    });

    expect(reducer({
      authorizationStatus: AuthorizationStatus.AUTH,
    }, {
      type: ActionType.SET_AUTHORIZATION_STATUS,
      payload: AuthorizationStatus.NOT_AUTH,
    })).toEqual({
      authorizationStatus: AuthorizationStatus.NOT_AUTH,
    });

    expect(reducer({
      authorizationStatus: AuthorizationStatus.AUTH,
    }, {
      type: ActionType.SET_AUTHORIZATION_STATUS,
      payload: AuthorizationStatus.AUTH,
    })).toEqual({
      authorizationStatus: AuthorizationStatus.AUTH,
    });

    expect(reducer({
      authorizationStatus: AuthorizationStatus.NOT_AUTH,
    }, {
      type: ActionType.SET_AUTHORIZATION_STATUS,
      payload: AuthorizationStatus.NOT_AUTH,
    })).toEqual({
      authorizationStatus: AuthorizationStatus.NOT_AUTH,
    });
  });

  it(`Reducer should update isAuthorizationError`, () => {
    expect(reducer({
      isAuthorizationError: false,
    }, {
      type: ActionType.SHOW_AUTHORIZATION_ERROR,
      payload: true,
    })).toEqual({
      isAuthorizationError: true,
    });

    expect(reducer({
      isAuthorizationError: true,
    }, {
      type: ActionType.CLEAR_AUTHORIZATION_ERROR,
      payload: false,
    })).toEqual({
      isAuthorizationError: false,
    });
  });

  it(`Reducer should update isAuthorizationProcessFinished`, () => {
    expect(reducer({
      isAuthorizationProcessFinished: false,
    }, {
      type: ActionType.FINISH_AUTHORIZATION_PROCESS,
      payload: true,
    })).toEqual({
      isAuthorizationProcessFinished: true,
    });
  });

  it(`Reducer should update userInfo`, () => {
    expect(reducer({
      userInfo: {
        id: 0,
        email: ``,
        name: ``,
        avatarSrc: ``,
      },
    }, {
      type: ActionType.SET_USER_DATA,
      payload: userMock,
    })).toEqual({
      userInfo: userMock,
    });
  });
});

describe(`ActionCreators work correctly`, () => {
  it(`requireAuthorization returns correct action`, () => {
    expect(ActionCreator.setAuthorizationStatus(AuthorizationStatus.NOT_AUTH)).toEqual({
      type: ActionType.SET_AUTHORIZATION_STATUS,
      payload: AuthorizationStatus.NOT_AUTH,
    });

    expect(ActionCreator.setAuthorizationStatus(AuthorizationStatus.AUTH)).toEqual({
      type: ActionType.SET_AUTHORIZATION_STATUS,
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

  it(`finishAuthorizationProcess returns correct action`, () => {
    expect(ActionCreator.finishAuthorizationProcess()).toEqual({
      type: ActionType.FINISH_AUTHORIZATION_PROCESS,
      payload: true,
    });
  });

  it(`setUserData returns correct action`, () => {
    expect(ActionCreator.setUserData(userMock)).toEqual({
      type: ActionType.SET_USER_DATA,
      payload: userMock,
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
      .reply(200, serverUser);

    return checkUserAuth(dispatch, () => noop, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_AUTHORIZATION_STATUS,
          payload: AuthorizationStatus.AUTH,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_USER_DATA,
          payload: createUser(serverUser),
        });
        expect(dispatch).toHaveBeenNthCalledWith(3, {
          type: ActionType.FINISH_AUTHORIZATION_PROCESS,
          payload: true,
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
      .reply(200, serverUser);

    return userLogin(dispatch, noop, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_AUTHORIZATION_STATUS,
          payload: AuthorizationStatus.AUTH,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_USER_DATA,
          payload: createUser(serverUser),
        });
      });
  });
});
