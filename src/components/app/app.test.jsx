import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import App from "./app";

import NameSpace from "../../store/name-space";

import {movieItemMock, moviesMock, userMock} from "../../helpers/test-data";
import {Pages, AuthorizationStatus} from "../../helpers/const";

const mockStore = configureStore([]);

it(`Should App render correctly`, () => {
  const store = mockStore({
    [NameSpace.APP]: {
      currentPage: Pages.MAIN,
      currentGenre: `All genres`,
      isMoviePlayerActive: false,
    },
    [NameSpace.DATA]: {
      moviePromo: movieItemMock,
      movies: moviesMock,
      isError: false,
    },
    [NameSpace.USER]: {
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
