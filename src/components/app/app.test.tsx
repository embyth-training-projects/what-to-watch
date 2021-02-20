import * as React from "react";
import * as renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import App from "./app";

import NameSpace from "../../store/name-space";

import {movieItemMock, moviesMock, userMock} from "../../helpers/test-data";
import {AuthorizationStatus} from "../../helpers/const";

const mockStore = configureStore([]);

it(`Should App render correctly`, () => {
  const store = mockStore({
    [NameSpace.APP]: {
      currentMovie: movieItemMock,
      currentGenre: `All genres`,
    },
    [NameSpace.DATA]: {
      moviePromo: movieItemMock,
      movies: moviesMock,
      isLoadError: false,
      isLoading: false,
    },
    [NameSpace.USER]: {
      isAuthorizationProcessFinished: true,
      authorizationStatus: AuthorizationStatus.AUTH,
      userInfo: userMock,
    },
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <App />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
