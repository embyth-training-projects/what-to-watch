import * as React from "react";
import * as renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {Router} from "react-router-dom";
import history from "../../history";

import MainPage from "./main-page";

import NameSpace from "../../store/name-space";
import {movieItemMock, moviesMock, userMock} from "../../helpers/test-data";
import {ALL_GENRES, AuthorizationStatus} from "../../helpers/const";

const mockStore = configureStore([]);

it(`Should MainPage render correctly`, () => {
  const store = mockStore({
    [NameSpace.APP]: {
      currentMovie: movieItemMock,
      currentGenre: ALL_GENRES,
    },
    [NameSpace.DATA]: {
      moviePromo: movieItemMock,
      movies: moviesMock,
    },
    [NameSpace.USER]: {
      authorizationStatus: AuthorizationStatus.AUTH,
      userInfo: userMock,
    },
  });

  const tree = renderer
    .create(
        <Router history={history}>
          <Provider store={store}>
            <MainPage />
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
