import {extend} from "../../helpers/utils";
import {Pages, ALL_GENRES, emptyMovie} from "../../helpers/const";

export const initialState = {
  currentMovie: emptyMovie,
  currentGenre: ALL_GENRES,
  currentPage: Pages.MAIN,
  isMoviePlayerActive: false,
};

export const ActionType = {
  SET_CURRENT_MOVIE: `SET_CURRENT_MOVIE`,
  SET_CURRENT_GENRE: `SET_CURRENT_GENRE`,
  GO_TO_MAIN_PAGE: `GO_TO_MAIN_PAGE`,
  GO_TO_MOVIE_PAGE: `GO_TO_MOVIE_PAGE`,
  GO_TO_SIGN_IN_PAGE: `GO_TO_SIGN_IN_PAGE`,
  WATCH_MOVIE: `WATCH_MOVIE`,
  STOP_WATCHING_MOVIE: `STOP_WATCHING_MOVIE`,
};

export const ActionCreator = {
  setCurrentMovie: (movie) => {
    return {
      type: ActionType.SET_CURRENT_MOVIE,
      payload: movie,
    };
  },

  setCurrentGenre: (genre) => {
    return {
      type: ActionType.SET_CURRENT_GENRE,
      payload: genre,
    };
  },

  goToMainPage: () => {
    return {
      type: ActionType.GO_TO_MAIN_PAGE,
      payload: Pages.MAIN,
    };
  },

  goToMoviePage: () => {
    return {
      type: ActionType.GO_TO_MOVIE_PAGE,
      payload: Pages.MOVIE,
    };
  },

  goToSignInPage: () => {
    return {
      type: ActionType.GO_TO_SIGN_IN_PAGE,
      payload: Pages.SIGN_IN,
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
    case ActionType.SET_CURRENT_MOVIE:
      return extend(state, {
        currentMovie: action.payload,
      });

    case ActionType.SET_CURRENT_GENRE:
      return extend(state, {
        currentGenre: action.payload,
      });

    case ActionType.GO_TO_MAIN_PAGE:
      return extend(state, {
        currentPage: action.payload,
      });

    case ActionType.GO_TO_MOVIE_PAGE:
      return extend(state, {
        currentPage: action.payload,
      });

    case ActionType.GO_TO_SIGN_IN_PAGE:
      return extend(state, {
        currentPage: action.payload,
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
