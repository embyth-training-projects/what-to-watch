import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import App from "./app";

import {movieItemMock, moviesMock, reviewsMock, genres} from "../../helpers/test-data";
import {ALL_GENRES} from "../../helpers/const";

const mockStore = configureStore([]);

it(`Should App render correctly`, () => {
  const store = mockStore({
    currentMovie: movieItemMock,
    movies: moviesMock,
    moviesReviews: reviewsMock,
    currentGenre: ALL_GENRES,
    moviesByGenre: moviesMock,
    genres,
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <App
            currentMovie={movieItemMock}
            movies={moviesMock}
            moviesReviews={reviewsMock}
          />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
