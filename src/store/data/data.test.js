import MockAdapter from "axios-mock-adapter";

import {createAPI} from "../../api";
import {createMovie} from "../../adapters";

import {initialState, ActionType, Operations, reducer} from "./data";
import {ActionType as AppActionType} from "../app/app";

import {moviesMock, movieItemMock, reviewsMock} from "../../helpers/test-data";
import {emptyMovie, RequestStatus, Pages} from "../../helpers/const";

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

  it(`Reducer should update isLoadError state on api load error`, () => {
    expect(reducer({
      isLoadError: false,
    }, {
      type: ActionType.CATCH_LOAD_ERROR,
      payload: true,
    })).toEqual({
      isLoadError: true,
    });
  });

  it(`Reducer should set right review request status`, () => {
    expect(reducer({
      reviewRequestStatus: RequestStatus.NOT_SENT,
    }, {
      type: ActionType.SET_REVIEW_REQUEST_STATUS,
      payload: RequestStatus.SENDING,
    })).toEqual({
      reviewRequestStatus: RequestStatus.SENDING,
    });

    expect(reducer({
      reviewRequestStatus: RequestStatus.SENDING,
    }, {
      type: ActionType.SET_REVIEW_REQUEST_STATUS,
      payload: RequestStatus.SUCCESS,
    })).toEqual({
      reviewRequestStatus: RequestStatus.SUCCESS,
    });

    expect(reducer({
      reviewRequestStatus: RequestStatus.SENDING,
    }, {
      type: ActionType.SET_REVIEW_REQUEST_STATUS,
      payload: RequestStatus.ERROR,
    })).toEqual({
      reviewRequestStatus: RequestStatus.ERROR,
    });

    expect(reducer({
      reviewRequestStatus: RequestStatus.ERROR,
    }, {
      type: ActionType.SET_REVIEW_REQUEST_STATUS,
      payload: RequestStatus.NOT_SENT,
    })).toEqual({
      reviewRequestStatus: RequestStatus.NOT_SENT,
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

  it(`Should make a correct API post request to /comments/1`, () => {
    const reviewData = {
      rating: 10,
      comment: `fake`,
    };
    const sendReview = Operations.sendReview(1, reviewData);
    const dispatch = jest.fn();

    apiMock
      .onPost(`/comments/1`, reviewData)
      .reply(200, [reviewData]);

    return sendReview(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(4);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_REVIEW_REQUEST_STATUS,
          payload: RequestStatus.SENDING,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.SET_REVIEW_REQUEST_STATUS,
          payload: RequestStatus.SUCCESS,
        });
        expect(dispatch).toHaveBeenNthCalledWith(4, {
          type: AppActionType.GO_TO_MOVIE_PAGE,
          payload: Pages.MOVIE,
        });
      });
  });
});
