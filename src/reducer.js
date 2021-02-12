import {movies} from "./mock/movies";
import {allMoviesReviews} from "./mock/reviews";
import {extend} from "./helpers/utils";
import {ALL_GENRES} from "./helpers/const";

const initialState = {
  currentMovie: movies[0],
  movies,
  moviesReviews: allMoviesReviews,
  activeGenre: ALL_GENRES,
  moviesByGenre: movies,
};

const filterMoviesByGenre = (allMovies, activeGenre) => {
  if (activeGenre === ALL_GENRES) {
    return allMovies;
  }

  return allMovies.filter((movie) => movie.genre === activeGenre);
};

export const ActionType = {
  GET_MOVIES_BY_GENRE: `GET_MOVIES_BY_GENRE`,
  GET_ACTIVE_GENRE: `GET_ACTIVE_GENRE`,
};

export const ActionCreator = {
  getMoviesByGenre: (activeGenre) => {
    const moviesByGenre = filterMoviesByGenre(movies, activeGenre);

    return {
      type: ActionType.GET_MOVIES_BY_GENRE,
      payload: moviesByGenre,
    };
  },

  getActiveGenre: (activeGenre) => {
    return {
      type: ActionType.GET_ACTIVE_GENRE,
      payload: activeGenre,
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
        activeGenre: action.payload,
      });

    default:
      return state;
  }
};
