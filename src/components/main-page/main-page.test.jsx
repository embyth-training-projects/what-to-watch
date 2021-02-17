import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import MainPage from "./main-page";

import NameSpace from "../../store/name-space";
import {movieItemMock, moviesMock, userMock} from "../../helpers/test-data";
import {ALL_GENRES, Pages, AuthorizationStatus} from "../../helpers/const";

const mockStore = configureStore([]);

it(`Should MainPage render correctly`, () => {
  const store = mockStore({
    [NameSpace.APP]: {
      currentPage: Pages.MAIN,
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
        <Provider store={store}>
          <MainPage />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
