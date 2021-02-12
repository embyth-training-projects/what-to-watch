import React from "react";
import renderer from "react-test-renderer";

import MoviesList from "./movies-list";

import {moviesMock} from "../../helpers/test-data";

it(`Should render correctly movies list`, () => {
  const tree = renderer
    .create(<MoviesList
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
