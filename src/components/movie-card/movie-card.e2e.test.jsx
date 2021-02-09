import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import MovieCard from "./movie-card";

const movie = {
  title: `movie-1`,
  image: `image-1`,
};

configure({adapter: new Adapter()});

it(`Movie Card be hovered`, () => {
  const onCardMouseOver = jest.fn((args) => args);

  const mainComponent = shallow(
      <MovieCard
        movie={movie}
        onTitleClick={() => {}}
        onCardMouseOver={onCardMouseOver}
      />
  );

  const movieCards = mainComponent.find(`.small-movie-card`);

  movieCards.forEach((card) => card.simulate(`mouseover`, movie));

  expect(onCardMouseOver).toHaveBeenCalledTimes(1);
  expect(onCardMouseOver.mock.calls[0][0]).toMatchObject(movie);
});
