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
};

export const ActionType = {
  SET_ACTIVE_GENRE: `SET_ACTIVE_GENRE`,
  GO_TO_MOVIE_PAGE: `GO_TO_MOVIE_PAGE`,
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

    default:
      return state;
  }
};
