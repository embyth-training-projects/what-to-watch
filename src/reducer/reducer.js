import {movies} from "../mock/movies";
import {allMoviesReviews} from "../mock/reviews";
import {extend, filterMoviesByGenre, getMoviesGenres} from "../helpers/utils";
import {Pages, ALL_GENRES} from "../helpers/const";

export const initialState = {
  currentMovie: movies[0],
  currentGenre: ALL_GENRES,
  currentPage: Pages.MAIN,
  movies,
  moviesReviews: allMoviesReviews,
  moviesByGenre: movies,
  genres: getMoviesGenres(movies),
};

export const ActionType = {
  GET_MOVIES_BY_GENRE: `GET_MOVIES_BY_GENRE`,
  GET_ACTIVE_GENRE: `GET_ACTIVE_GENRE`,
};

export const ActionCreator = {
  getMoviesByGenre: (currentGenre) => {
    const moviesByGenre = filterMoviesByGenre(movies, currentGenre);

    return {
      type: ActionType.GET_MOVIES_BY_GENRE,
      payload: moviesByGenre,
    };
  },

  getcurrentGenre: (currentGenre) => {
    return {
      type: ActionType.GET_ACTIVE_GENRE,
      payload: currentGenre,
    };
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_MOVIES_BY_GENRE:
      return extend(state, {
        moviesByGenre: action.payload,
      });

    case ActionType.GET_ACTIVE_GENRE:
      return extend(state, {
        currentGenre: action.payload,
      });

    default:
      return state;
  }
};
