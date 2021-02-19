import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import history from "../../history";

import MovieCard from "./movie-card";

import {movieItemMock} from "../../helpers/test-data";

it(`Should render correctly movie card`, () => {
  const tree = renderer
    .create(
        <Router history={history}>
          <MovieCard
            movie={movieItemMock}
            isPlaying={true}
            onMovieCardClick={() => {}}
            onMovieCardMouseEnter={() => {}}
            onMovieCardMouseOut={() => {}}
          />
        </Router>, {
          createNodeMock: () => {
            return {};
          }
        }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
