import React from "react";
import {mount, configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

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

configure({adapter: new Adapter()});

it(`Should title be clicked`, () => {
  const titleClickHandler = jest.fn();

  const mainPageComponent = mount(
      <MainPage
        promoMovie={promoMovieMock}
        movieCards={movieCardsMock}
        onTitleClick={titleClickHandler}
      />
  );

  const movieTitles = mainPageComponent.find(`.small-movie-card__title`);

  movieTitles.forEach((title) => title.simulate(`click`));

  expect(titleClickHandler.mock.calls.length).toBe(movieCardsMock.length);
});
