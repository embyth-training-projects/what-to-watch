import {movies} from "../mock/movies";
import {allMoviesReviews} from "../mock/reviews";
import {extend} from "../helpers/utils";
import {Pages, ALL_GENRES} from "../helpers/const";

export const initialState = {
  currentMovie: movies[0],
  currentGenre: ALL_GENRES,
  currentPage: Pages.MAIN,
  movies,
  moviesReviews: allMoviesReviews,
  isMoviePlayerActive: false,
};

export const ActionType = {
  SET_ACTIVE_GENRE: `SET_ACTIVE_GENRE`,
  GO_TO_MOVIE_PAGE: `GO_TO_MOVIE_PAGE`,
  WATCH_MOVIE: `WATCH_MOVIE`,
  STOP_WATCHING_MOVIE: `STOP_WATCHING_MOVIE`,
};

export const ActionCreator = {
  setCurrentGenre: (currentGenre) => {
    return {
      type: ActionType.SET_ACTIVE_GENRE,
      payload: currentGenre,
    };
  },

  goToMoviePage: (chosenMovie) => {
    return {
      type: ActionType.GO_TO_MOVIE_PAGE,
      payload: chosenMovie,
    };
  },

  watchMovie: () => {
    return {
      type: ActionType.WATCH_MOVIE,
      payload: true,
    };
  },

  stopWatchingMovie: () => {
    return {
      type: ActionType.STOP_WATCHING_MOVIE,
      payload: false,
    };
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_ACTIVE_GENRE:
      return extend(state, {
        currentGenre: action.payload,
      });

    case ActionType.GO_TO_MOVIE_PAGE:
      return extend(state, {
        currentMovie: action.payload,
        currentPage: Pages.MOVIE,
      });

    case ActionType.WATCH_MOVIE:
      return extend(state, {
        isMoviePlayerActive: action.payload,
      });

    case ActionType.STOP_WATCHING_MOVIE:
      return extend(state, {
        isMoviePlayerActive: action.payload,
      });

    default:
      return state;
  }
};
