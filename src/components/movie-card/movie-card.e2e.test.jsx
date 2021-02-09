import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import MovieCard from "./movie-card";

const movie = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  date: `2014`,
  background: `img/bg-the-grand-budapest-hotel.jpg`,
  poster: `img/the-grand-budapest-hotel-poster.jpg`,
  id: 194584,
  description: [`In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege`, `Gustave prides himself on providing first-class service to the hotel's guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave's lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`],
  rating: `8,9`,
  ratingDescription: `Very good`,
  votes: 240,
  director: `Wes Andreson`,
  starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`]
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
