import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import MovieCard from "./movie-card";

import {movieItemMock} from "../../helpers/test-data";

configure({adapter: new Adapter()});

describe(`Movie Card end-2-end tests`, () => {
  it(`Movie Card be hovered`, () => {
    const onMovieCardMouseOver = jest.fn((args) => args);

    const mainComponent = shallow(
        <MovieCard
          movie={movieItemMock}
          onMovieCardClick={() => {}}
          onMovieCardMouseOver={onMovieCardMouseOver}
        />
    );

    const movieCards = mainComponent.find(`.small-movie-card`);

    movieCards.forEach((card) => card.simulate(`mouseover`, movieItemMock));

    expect(onMovieCardMouseOver).toHaveBeenCalledTimes(1);
    expect(onMovieCardMouseOver).toHaveBeenCalledWith(movieItemMock);
  });

  it(`Movie Card be clicked`, () => {
    const onMovieCardClick = jest.fn();

    const mainComponent = shallow(
        <MovieCard
          movie={movieItemMock}
          onMovieCardClick={onMovieCardClick}
          onMovieCardMouseOver={() => {}}
        />
    );

    const movieCard = mainComponent.find(`.small-movie-card`);

    movieCard.simulate(`click`, {preventDefault: onMovieCardClick});

    expect(onMovieCardClick).toHaveBeenCalledTimes(2);
  });
});
