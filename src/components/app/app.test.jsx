import React from "react";
import renderer from "react-test-renderer";

import App from "./app";

const promoMovieMock = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  releaseDate: `2014`,
};

const movieCardsMock = [
  {
    title: `movie-1`,
    image: `image-1`,
  },
  {
    title: `movie-2`,
    image: `image-2`,
  },
  {
    title: `movie-3`,
    image: `image-3`,
  },
  {
    title: `movie-4`,
    image: `image-4`,
  },
];

it(`Should App render correctly`, () => {
  const tree = renderer
    .create(<App
      promoMovie={promoMovieMock}
      movieCards={movieCardsMock}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
