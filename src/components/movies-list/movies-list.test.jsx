import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import MoviesList from "./movies-list";

import {moviesMock} from "../../helpers/test-data";
import {ALL_GENRES} from "../../helpers/const";

const mockStore = configureStore([]);

it(`Should render correctly movies list`, () => {
  const store = mockStore({
    currentGenre: ALL_GENRES,
    movies: moviesMock,
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <MoviesList
            movies={moviesMock}
            moviesByGenre={moviesMock}
            onMovieCardClick={() => {}}
            onMovieCardMouseEnter={() => {}}
            onMovieCardMouseOut={() => {}}
            render={() => {}}
            isPlaying={true}
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
