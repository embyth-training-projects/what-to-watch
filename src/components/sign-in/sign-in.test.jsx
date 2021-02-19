import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {Router} from "react-router-dom";
import history from "../../history";

import SignIn from "./sign-in";

import NameSpace from "../../store/name-space";
import {movieItemMock} from "../../helpers/test-data";

const mockStore = configureStore([]);

describe(`SignIn tests`, () => {
  it(`SignIn should render correctly without Error Message`, () => {
    const store = mockStore({
      [NameSpace.APP]: {
        currentMovie: movieItemMock,
      },
      [NameSpace.USER]: {
        isAuthorizationError: false,
      },
    });

    const tree = renderer
    .create(
        <Router history={history}>
          <Provider store={store}>
            <SignIn />
          </Provider>
        </Router>, {
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
        currentMovie: movieItemMock,
      },
      [NameSpace.USER]: {
        isAuthorizationError: true,
      },
    });

    const tree = renderer
    .create(
        <Router history={history}>
          <Provider store={store}>
            <SignIn />
          </Provider>
        </Router>, {
          createNodeMock: () => {
            return {};
          }
        }
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
