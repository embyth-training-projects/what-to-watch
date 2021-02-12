import React from "react";
import {mount, configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import MainPage from "./main-page";

import {movieItemMock, moviesMock} from "../../helpers/test-data";

configure({adapter: new Adapter()});

it(`Should movie card be clicked`, () => {
  const movieCardClickHandler = jest.fn();

  const mainPageComponent = mount(
      <MainPage
        promoMovie={movieItemMock}
        movieCards={moviesMock}
        onMovieCardClick={movieCardClickHandler}
      />
  );

  const movieCards = mainPageComponent.find(`.small-movie-card`);

  movieCards.forEach((card) => card.simulate(`click`));

  expect(movieCardClickHandler.mock.calls.length).toBe(moviesMock.length);
});
