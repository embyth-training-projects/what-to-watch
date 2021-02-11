import React from "react";
import renderer from "react-test-renderer";

import MoviePage from "./movie-page";

import {movieItemMock, moviesMock} from "../../utils/test-data";

it(`Should render correctly Movie Page`, () => {
  const tree = renderer
    .create(<MoviePage
      movie={movieItemMock}
      movies={moviesMock}
      onMovieCardClick={() => {}}
    />, {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
