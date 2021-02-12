import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import MoviePage from "./movie-page";

import {movieItemMock, moviesMock, reviewsMock} from "../../helpers/test-data";
import {ALL_GENRES} from "../../helpers/const";

const mockStore = configureStore([]);

it(`Should render correctly Movie Page`, () => {
  const store = mockStore({
    currentGenre: ALL_GENRES,
    moviesByGenre: moviesMock,
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <MoviePage
            movie={movieItemMock}
            movies={moviesMock}
            reviews={reviewsMock[0]}
            onMovieCardClick={() => {}}
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
