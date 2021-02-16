import {extend} from "../../helpers/utils";
import {emptyMovie} from "../../helpers/const";

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
  loadMoviePromo: () => {
    // здесь будет запрос к апи на загрузку промо фильма
  },

  loadMovies: () => {
    // здесь будет запрос к апи на загрузку массива фильмов
  },

  loadMovieReviews: () => {
    // здесь будет запрос к апи на загрузку рецензий к фильму
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
