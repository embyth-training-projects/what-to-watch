import {extend} from "../../helpers/utils";
import {emptyMovie} from "../../helpers/const";
import {createMovie} from "../../adapters";

import {ActionCreator as AppActionCreator} from "../app/app";

export const initialState = {
  moviePromo: emptyMovie,
  movies: [],
  movieReviews: [],
};

export const ActionType = {
  LOAD_MOVIE_PROMO: `LOAD_MOVIE_PROMO`,
  LOAD_MOVIES: `LOAD_MOVIES`,
  LOAD_MOVIE_REVIEWS: `LOAD_MOVIE_REVIEWS`,
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
};

export const Operations = {
  loadMoviePromo: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
      .then((response) => {
        const adaptedMovie = createMovie(response.data);
        dispatch(ActionCreator.loadMoviePromo(adaptedMovie));
        dispatch(AppActionCreator.setCurrentMovie(adaptedMovie));
      });
  },

  loadMovies: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        const apdatedMovies = response.data.map((movie) => createMovie(movie));
        dispatch(ActionCreator.loadMovies(apdatedMovies));
      });
  },

  loadMovieReviews: (movieId) => (dispatch, getState, api) => {
    return api.get(`/comments/${movieId}`)
      .then((response) => dispatch(ActionCreator.loadMovieReviews(response.data)));
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

    default:
      return state;
  }
};
