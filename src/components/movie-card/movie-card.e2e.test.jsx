import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import {MovieCard} from "./movie-card";

import {movieItemMock} from "../../helpers/test-data";

configure({adapter: new Adapter()});

describe(`Movie Card end-2-end tests`, () => {
  it(`Movie Card should be hovered`, () => {
    const onMovieCardMouseEnter = jest.fn();

    const mainComponent = shallow(
        <MovieCard
          movie={movieItemMock}
          isPlaying={false}
          onMovieCardClick={() => {}}
          onMovieCardMouseEnter={onMovieCardMouseEnter}
          onMovieCardMouseOut={() => {}}
        />
    );

    const movieCards = mainComponent.find(`.small-movie-card`);

    movieCards.forEach((card) => card.simulate(`mouseenter`, movieItemMock));

    expect(onMovieCardMouseEnter).toHaveBeenCalledTimes(1);
  });

  it(`Movie Card be clicked`, () => {
    const onMovieCardClick = jest.fn();

    const mainComponent = shallow(
        <MovieCard
          movie={movieItemMock}
          isPlaying={false}
          onMovieCardClick={onMovieCardClick}
          onMovieCardMouseEnter={() => {}}
          onMovieCardMouseOut={() => {}}
        />
    );

    const movieCard = mainComponent.find(`.small-movie-card`);

    movieCard.simulate(`click`, {preventDefault: onMovieCardClick});

    expect(onMovieCardClick).toHaveBeenCalledTimes(2);
  });
});
