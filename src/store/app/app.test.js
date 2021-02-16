import {initialState, ActionType, reducer} from "./app";
import {movieItemMock} from "../helpers/test-data";
import {ALL_GENRES, Pages, emptyMovie} from "../helpers/const";

describe(`App State Reducer tests`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`Reducer should return right current genre`, () => {
    expect(reducer({
      currentGenre: ALL_GENRES,
    }, {
      type: ActionType.SET_CURRENT_GENRE,
      payload: `Drama`,
    })).toEqual({
      currentGenre: `Drama`,
    });
  });

  it(`Reducer should return right current movie`, () => {
    expect(reducer({
      currentMovie: emptyMovie,
    }, {
      type: ActionType.SET_CURRENT_MOVIE,
      payload: movieItemMock,
    })).toEqual({
      currentMovie: movieItemMock,
    });
  });

  it(`Reducer should return right current page`, () => {
    expect(reducer({
      currentPage: Pages.MAIN,
    }, {
      type: ActionType.GO_TO_MOVIE_PAGE,
      payload: Pages.MOVIE,
    })).toEqual({
      currentPage: Pages.MOVIE,
    });
  });

  it(`Reducer should return true value of isMoviePlayerActive state`, () => {
    expect(reducer({
      isMoviePlayerActive: false,
    }, {
      type: ActionType.WATCH_MOVIE,
      payload: true,
    })).toEqual({
      isMoviePlayerActive: true,
    });
  });

  it(`Reducer should return false value of isMoviePlayerActive state`, () => {
    expect(reducer({
      isMoviePlayerActive: true,
    }, {
      type: ActionType.STOP_WATCHING_MOVIE,
      payload: false,
    })).toEqual({
      isMoviePlayerActive: false,
    });
  });
});
