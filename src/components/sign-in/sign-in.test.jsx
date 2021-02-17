import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import SignIn from "./sign-in";

import NameSpace from "../../store/name-space";
import {Pages} from "../../helpers/const";

const mockStore = configureStore([]);

describe(`SignIn tests`, () => {
  it(`SignIn should render correctly without Error Message`, () => {
    const store = mockStore({
      [NameSpace.APP]: {
        currentPage: Pages.SIGN_IN,
      },
      [NameSpace.USER]: {
        isAuthorizationError: false,
      },
    });

    const tree = renderer
    .create(
        <Provider store={store}>
          <SignIn />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`SignIn should render correctly with Error Message`, () => {
    const store = mockStore({
      [NameSpace.APP]: {
        currentPage: Pages.SIGN_IN,
      },
      [NameSpace.USER]: {
        isAuthorizationError: true,
      },
    });

    const tree = renderer
    .create(
        <Provider store={store}>
          <SignIn />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
