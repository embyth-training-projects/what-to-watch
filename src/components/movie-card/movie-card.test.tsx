import * as React from "react";
import * as renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import history from "../../history";

import MovieCard from "./movie-card";

import {movieItemMock, noop} from "../../helpers/test-data";

it(`Should render correctly movie card`, () => {
  const tree = renderer
    .create(
        <Router history={history}>
          <MovieCard
            movie={movieItemMock}
            isPlaying={true}
            onMovieCardMouseEnter={noop}
            onMovieCardMouseOut={noop}
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
