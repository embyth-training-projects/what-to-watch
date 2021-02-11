import React from "react";
import renderer from "react-test-renderer";

import MoviesLikeThis, {getFilteredMovies} from "./movies-like-this";

import {movieItemMock, moviesMock} from "../../utils/test-data";

describe(`Function getFilteredMovies works correctly`, () => {
  it(`Should return movies array with similar genre`, () => {
    expect(getFilteredMovies(moviesMock, movieItemMock)).toEqual([{
      title: `Aviator`,
      genre: `Drama`,
      date: `2004`,
      background: `https://placeimg.com/1300/512/nature`,
      poster: `img/aviator.jpg`,
      id: 167456,
      description: [`A biopic depicting the early years of legendary Director and aviator Howard Hughes' career from the late 1920s to the mid 1940s.`],
      rating: `7,5`,
      ratingDescription: `Normal`,
      votes: 1650,
      director: `Martin Scorsese`,
      starring: [`Leonardo DiCaprio`, `Cate Blanchett`, `Kate Beckinsale`],
      preview: `https://upload.wikimedia.org/wikipedia/commons/9/9b/St._Lambertus_%28Immerather_Dom%29_2016.webm`,
    }]);
  });

  it(`Should return empty array when no similar movies`, () => {
    expect(getFilteredMovies(moviesMock, moviesMock[0])).toEqual([]);
  });
});

it(`MoviesLikeThis should render correctly`, () => {
  const tree = renderer
    .create(<MoviesLikeThis
      movies={moviesMock}
      currentMovie={movieItemMock}
      onMovieCardClick={() => {}}
    />, {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
