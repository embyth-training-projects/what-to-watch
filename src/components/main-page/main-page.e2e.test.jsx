import React from "react";
import {shallow, configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import MainPage from "./main-page";

const movieCardMock = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  releaseDate: 2014,
};

configure({adapter: new Adapter()});

it(`Should title be clicked`, () => {
  const titleClickHandler = jest.fn();

  const mainPageComponent = shallow(
      <MainPage
        movieCard={movieCardMock}
        onTitleClick={titleClickHandler}
      />
  );

  const movieTitle = mainPageComponent.find(`.movie-card__title`);

  movieTitle.simulate(`click`);

  expect(titleClickHandler).toHaveBeenCalledTimes(1);
});
