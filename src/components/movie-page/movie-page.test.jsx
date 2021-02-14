import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import MoviePage from "./movie-page";

import {movieItemMock, moviesMock} from "../../helpers/test-data";

const mockStore = configureStore([]);

it(`Should render correctly Movie Page`, () => {
  const store = mockStore({
    currentMovie: movieItemMock,
    movies: moviesMock,
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <MoviePage />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
