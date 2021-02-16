import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import Catalog from "./catalog";

import NameSpace from "../../store/name-space";

import {movieItemMock, moviesMock} from "../../helpers/test-data";
import {ALL_GENRES} from "../../helpers/const";

const mockStore = configureStore([]);

it(`Catalog should render correctly`, () => {
  const store = mockStore({
    [NameSpace.APP]: {
      currentMovie: movieItemMock,
      currentGenre: ALL_GENRES,
    },
    [NameSpace.DATA]: {
      movies: moviesMock,
    },
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <Catalog />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
