import React from "react";
import renderer from "react-test-renderer";

import {MovieCard} from "./movie-card";

import {movieItemMock} from "../../helpers/test-data";

it(`Should render correctly movie card`, () => {
  const tree = renderer
    .create(<MovieCard
      movie={movieItemMock}
      isPlaying={true}
      onMovieCardClick={() => {}}
      onMovieCardMouseEnter={() => {}}
      onMovieCardMouseOut={() => {}}
    />, {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
