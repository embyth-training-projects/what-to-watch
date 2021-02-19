import {extend} from "../../helpers/utils";
import {RequestStatus, Favorites} from "../../helpers/const";
import {createMovie} from "../../adapters";

import {ActionCreator as AppActionCreator} from "../app/app";

export const initialState = {
  moviePromo: {},
  movies: [],
  movieReviews: [],
  favoriteMovies: [],
  isLoadError: false,
  isLoading: true,
  reviewRequestStatus: RequestStatus.NOT_SENT,
  favoriteRequestStatus: RequestStatus.NOT_SENT,
};

export const ActionType = {
  LOAD_MOVIE_PROMO: `LOAD_MOVIE_PROMO`,
  LOAD_MOVIES: `LOAD_MOVIES`,
  LOAD_MOVIE_REVIEWS: `LOAD_MOVIE_REVIEWS`,
  LOAD_FAVORITE_MOVIES: `LOAD_FAVORITE_MOVIES`,
  CATCH_LOAD_ERROR: `CATCH_LOAD_ERROR`,
  SET_REVIEW_REQUEST_STATUS: `SET_REVIEW_REQUEST_STATUS`,
  SET_FAVORITE_REQUEST_STATUS: `SET_FAVORITE_REQUEST_STATUS`,
  FINISH_LOADING: `FINISH_LOADING`,
};

export const ActionCreator = {
  loadMoviePromo: (movie) => ({
    type: ActionType.LOAD_MOVIE_PROMO,
    payload: movie,
  }),

  loadMovies: (movies) => ({
    type: ActionType.LOAD_MOVIES,
    payload: movies,
  }),

  loadMovieReviews: (reviews) => ({
    type: ActionType.LOAD_MOVIE_REVIEWS,
    payload: reviews,
  }),

  loadFavoriteMovies: (movies) => ({
    type: ActionType.LOAD_FAVORITE_MOVIES,
    payload: movies,
  }),

  catchLoadError: () => ({
    type: ActionType.CATCH_LOAD_ERROR,
    payload: true,
  }),

  setReviewRequestStatus: (status) => ({
    type: ActionType.SET_REVIEW_REQUEST_STATUS,
    payload: status,
  }),

  setFavoriteRequestStatus: (status) => ({
    type: ActionType.SET_FAVORITE_REQUEST_STATUS,
    payload: status,
  }),

  finishLoading: () => ({
    type: ActionType.FINISH_LOADING,
    payload: false,
  }),
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

  loadFavoriteMovies: () => (dispatch, getState, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        const apdatedMovies = response.data.map((movie) => createMovie(movie));
        dispatch(ActionCreator.loadFavoriteMovies(apdatedMovies));
      })
      .catch(() => {
        dispatch(ActionCreator.catchLoadError());
      });
  },

  changeIsMovieFavorite: (movieId, isFavorite) => (dispatch, getState, api) => {
    dispatch(ActionCreator.setFavoriteRequestStatus(RequestStatus.SENDING));
    return api.post(`/favorite/${movieId}/${isFavorite ? Favorites.ADD : Favorites.REMOVE}`)
      .then(() => {
        dispatch(ActionCreator.setFavoriteRequestStatus(RequestStatus.SUCCESS));
        dispatch(Operations.loadMovies());
        dispatch(Operations.loadMoviePromo());
      })
      .catch(() => {
        dispatch(ActionCreator.setFavoriteRequestStatus(RequestStatus.ERROR));
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

    case ActionType.LOAD_FAVORITE_MOVIES:
      return extend(state, {
        favoriteMovies: action.payload,
      });

    case ActionType.CATCH_LOAD_ERROR:
      return extend(state, {
        isLoadError: action.payload,
      });

    case ActionType.SET_REVIEW_REQUEST_STATUS:
      return extend(state, {
        reviewRequestStatus: action.payload,
      });

    case ActionType.SET_FAVORITE_REQUEST_STATUS:
      return extend(state, {
        favoriteRequestStatus: action.payload,
      });

    case ActionType.FINISH_LOADING:
      return extend(state, {
        isLoading: action.payload,
      });

    default:
      return state;
  }
};
