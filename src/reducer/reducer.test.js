import {initialState, ActionType, reducer} from "./reducer";
import {filterMoviesByGenre} from "../helpers/utils";
import {moviesMock} from "../helpers/test-data";
import {ALL_GENRES} from "../helpers/const";

describe(`Reducer tests`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`Reducer should return all films when 'All genres' chosen`, () => {
    expect(reducer({
      currentGenre: ALL_GENRES,
      moviesByGenre: moviesMock,
    }, {
      type: ActionType.GET_MOVIES_BY_GENRE,
      payload: filterMoviesByGenre(moviesMock, ALL_GENRES),
    })).toEqual({
      currentGenre: ALL_GENRES,
      moviesByGenre: moviesMock,
    });
  });

  it(`Reducer should return right films when specific genre is chosen`, () => {
    expect(reducer({
      currentGenre: `Drama`,
      moviesByGenre: moviesMock,
    }, {
      type: ActionType.GET_MOVIES_BY_GENRE,
      payload: filterMoviesByGenre(moviesMock, `Drama`),
    })).toEqual({
      currentGenre: `Drama`,
      moviesByGenre: [
        {
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
          runTime: `2h 50m`,
        }
      ],
    });
  });

  it(`Reducer should return right active genre`, () => {
    expect(reducer({
      currentGenre: ALL_GENRES,
    }, {
      type: ActionType.GET_ACTIVE_GENRE,
      payload: `Drama`,
    })).toEqual({
      currentGenre: `Drama`,
    });
  });
});
