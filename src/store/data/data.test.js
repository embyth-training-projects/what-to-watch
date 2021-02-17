import MockAdapter from "axios-mock-adapter";

import {createAPI} from "../../api";
import {createMovie} from "../../adapters";

import {initialState, ActionType, Operations, reducer} from "./data";
import {ActionType as AppActionType} from "../app/app";

import {moviesMock, movieItemMock, reviewsMock} from "../../helpers/test-data";
import {emptyMovie} from "../../helpers/const";

const api = createAPI();

describe(`Data State Reducer test`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(void 0, {})).toEqual(initialState);
  });

  it(`Reducer should update moviePromo by load`, () => {
    expect(reducer({
      moviePromo: emptyMovie,
    }, {
      type: ActionType.LOAD_MOVIE_PROMO,
      payload: movieItemMock,
    })).toEqual({
      moviePromo: movieItemMock,
    });
  });

  it(`Reducer should update movies by load`, () => {
    expect(reducer({
      movies: [],
    }, {
      type: ActionType.LOAD_MOVIES,
      payload: moviesMock,
    })).toEqual({
      movies: moviesMock,
    });
  });

  it(`Reducer should update movieReviews by load`, () => {
    expect(reducer({
      movieReviews: [],
    }, {
      type: ActionType.LOAD_MOVIE_REVIEWS,
      payload: reviewsMock,
    })).toEqual({
      movieReviews: reviewsMock,
    });
  });

  it(`Reducer should update isError state on api error`, () => {
    expect(reducer({
      isError: false,
    }, {
      type: ActionType.CATCH_ERROR,
      payload: true,
    })).toEqual({
      isError: true,
    });
  });
});

describe(`Operations work correctly`, () => {
  const apiMock = new MockAdapter(api);

  it(`Should make a correct API call to /films/promo`, () => {
    const moviePromoLoader = Operations.loadMoviePromo();
    const dispatch = jest.fn();

    apiMock
      .onGet(`/films/promo`)
      .reply(200, movieItemMock);

    return moviePromoLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_MOVIE_PROMO,
          payload: createMovie(movieItemMock),
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: AppActionType.SET_CURRENT_MOVIE,
          payload: createMovie(movieItemMock),
        });
      });
  });

  it(`Should make a correct API call to /films`, () => {
    const moviesLoader = Operations.loadMovies();
    const dispatch = jest.fn();

    apiMock
      .onGet(`/films`)
      .reply(200, [movieItemMock]);

    return moviesLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_MOVIES,
          payload: [createMovie(movieItemMock)],
        });
      });
  });

  it(`Should make a correct API call to /comments/id`, () => {
    const commentsLoader = Operations.loadMovieReviews(2);
    const dispatch = jest.fn();

    apiMock
      .onGet(`/comments/2`)
      .reply(200, reviewsMock);

    return commentsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_MOVIE_REVIEWS,
          payload: reviewsMock,
        });
      });
  });
});
