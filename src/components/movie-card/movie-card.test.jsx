import React from "react";
import renderer from "react-test-renderer";

import MovieCard from "./movie-card";

const movie = {
  title: `movie-1`,
  image: `image-1`,
};

it(`Should render correctly movie card`, () => {
  const tree = renderer
    .create(<MovieCard
      movie={movie}
      onTitleClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
