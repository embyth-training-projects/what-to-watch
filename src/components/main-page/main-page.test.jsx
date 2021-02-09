import React from "react";
import renderer from "react-test-renderer";

import MainPage from "./main-page";

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

it(`Should MainPage render correctly`, () => {
  const tree = renderer
    .create(
        <MainPage
          promoMovie={promoMovieMock}
          movieCards={movieCardsMock}
          onTitleClick={() => {}}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
