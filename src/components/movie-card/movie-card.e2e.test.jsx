import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import MovieCard from "./movie-card";

import {movieItemMock} from "../../helpers/test-data";

configure({adapter: new Adapter()});

describe(`Movie Card end-2-end tests`, () => {
  it(`Movie Card should be hovered`, () => {
    const onMovieCardMouseEnter = jest.fn();
    const onMovieCardMouseOut = jest.fn();

    const mainComponent = shallow(
        <MovieCard
          movie={movieItemMock}
          isPlaying={false}
          onMovieCardMouseEnter={onMovieCardMouseEnter}
          onMovieCardMouseOut={onMovieCardMouseOut}
        />
    );

    const movieCards = mainComponent.find(`.small-movie-card`);

    movieCards.forEach((card) => card.simulate(`mouseenter`, movieItemMock));
    expect(onMovieCardMouseEnter).toHaveBeenCalledTimes(1);

    movieCards.forEach((card) => card.simulate(`mouseout`, movieItemMock));
    expect(onMovieCardMouseOut).toHaveBeenCalledTimes(1);
  });
});
