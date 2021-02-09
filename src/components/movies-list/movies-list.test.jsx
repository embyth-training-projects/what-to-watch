import React from "react";
import renderer from "react-test-renderer";

import MoviesList from "./movies-list";

const movies = [
  {
    title: `title-1`,
    image: `image-1`,
  },
  {
    title: `title-2`,
    image: `image-2`,
  },
  {
    title: `title-3`,
    image: `image-3`,
  },
  {
    title: `title-4`,
    image: `image-4`,
  },
];

it(`Should render correctly movies list`, () => {
  const tree = renderer
    .create(<MoviesList
      movies={movies}
      onTitleClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
