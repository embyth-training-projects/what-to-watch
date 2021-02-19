import {extend} from "../../helpers/utils";
import {emptyMovie, RequestStatus} from "../../helpers/const";
import {createMovie} from "../../adapters";

import {ActionCreator as AppActionCreator} from "../app/app";

export const initialState = {
  moviePromo: emptyMovie,
  movies: [],
  movieReviews: [],
  isLoadError: false,
  isLoading: true,
  reviewRequestStatus: RequestStatus.NOT_SENT,
};

export const ActionType = {
  LOAD_MOVIE_PROMO: `LOAD_MOVIE_PROMO`,
  LOAD_MOVIES: `LOAD_MOVIES`,
  LOAD_MOVIE_REVIEWS: `LOAD_MOVIE_REVIEWS`,
  CATCH_LOAD_ERROR: `CATCH_LOAD_ERROR`,
  SET_REVIEW_REQUEST_STATUS: `SET_REVIEW_REQUEST_STATUS`,
  FINISH_LOADING: `FINISH_LOADING`,
};

export const ActionCreator = {
  loadMoviePromo: (movie) => {
    return {
      type: ActionType.LOAD_MOVIE_PROMO,
      payload: movie,
    };
  },

  loadMovies: (movies) => {
    return {
      type: ActionType.LOAD_MOVIES,
      payload: movies,
    };
  },

  loadMovieReviews: (reviews) => {
    return {
      type: ActionType.LOAD_MOVIE_REVIEWS,
      payload: reviews,
    };
  },

  catchLoadError: () => {
    return {
      type: ActionType.CATCH_LOAD_ERROR,
      payload: true,
    };
  },

  setReviewRequestStatus: (status) => {
    return {
      type: ActionType.SET_REVIEW_REQUEST_STATUS,
      payload: status,
    };
  },

  finishLoading: () => {
    return {
      type: ActionType.FINISH_LOADING,
      payload: false,
    };
  },
};

export const Operations = {
  loadMoviePromo: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
      .then((response) => {
        const adaptedMovie = createMovie(response.data);
        dispatch(ActionCreator.loadMoviePromo(adaptedMovie));
        dispatch(AppActionCreator.setCurrentMovie(adaptedMovie));
      })
      .catch(() => {
        dispatch(ActionCreator.catchLoadError());
      });
  },

  loadMovies: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        const apdatedMovies = response.data.map((movie) => createMovie(movie));
        dispatch(ActionCreator.loadMovies(apdatedMovies));
        dispatch(ActionCreator.finishLoading());
      })
      .catch(() => {
        dispatch(ActionCreator.catchLoadError());
      });
  },

  loadMovieReviews: (movieId) => (dispatch, getState, api) => {
    return api.get(`/comments/${movieId}`)
      .then((response) => dispatch(ActionCreator.loadMovieReviews(response.data)))
      .catch(() => {
        dispatch(ActionCreator.catchLoadError());
      });
  },

  sendReview: (movieId, reviewData) => (dispatch, getState, api) => {
    dispatch(ActionCreator.setReviewRequestStatus(RequestStatus.SENDING));
    return api.post(`/comments/${movieId}`, {
      rating: reviewData.rating,
      comment: reviewData.comment,
    })
      .then(() => {
        dispatch(ActionCreator.setReviewRequestStatus(RequestStatus.SUCCESS));
        dispatch(Operations.loadMovieReviews(movieId));
        dispatch(AppActionCreator.goToMoviePage());
      })
      .catch(() => {
        dispatch(ActionCreator.setReviewRequestStatus(RequestStatus.ERROR));
      });
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_MOVIE_PROMO:
      return extend(state, {
        moviePromo: action.payload,
      });

    case ActionType.LOAD_MOVIES:
      return extend(state, {
        movies: action.payload,
      });

    case ActionType.LOAD_MOVIE_REVIEWS:
      return extend(state, {
        movieReviews: action.payload,
      });

    case ActionType.CATCH_LOAD_ERROR:
      return extend(state, {
        isLoadError: action.payload,
      });

    case ActionType.SET_REVIEW_REQUEST_STATUS:
      return extend(state, {
        reviewRequestStatus: action.payload,
      });

    case ActionType.FINISH_LOADING:
      return extend(state, {
        isLoading: action.payload,
      });

    default:
      return state;
  }
};
