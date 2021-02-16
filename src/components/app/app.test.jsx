import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import App from "./app";

import NameSpace from "../../store/name-space";

import {movieItemMock, moviesMock} from "../../helpers/test-data";
import {Pages} from "../../helpers/const";

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
