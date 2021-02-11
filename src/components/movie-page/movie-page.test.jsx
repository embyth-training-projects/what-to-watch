import React from "react";
import renderer from "react-test-renderer";

import MoviePage from "./movie-page";

import {movieItemMock, moviesMock, reviewsMock} from "../../utils/test-data";

it(`Should render correctly Movie Page`, () => {
  const tree = renderer
    .create(<MoviePage
      movie={movieItemMock}
      movies={moviesMock}
      reviews={reviewsMock[0]}
      onMovieCardClick={() => {}}
    />, {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
