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
  isMainPage: true,
};

export const ActionType = {
  GET_MOVIES_BY_GENRE: `GET_MOVIES_BY_GENRE`,
  GET_ACTIVE_GENRE: `GET_ACTIVE_GENRE`,
  GO_TO_MOVIE_PAGE: `GO_TO_MOVIE_PAGE`,
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

  goToMoviePage: (chosenMovie) => {
    return {
      type: ActionType.GO_TO_MOVIE_PAGE,
      payload: chosenMovie,
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

    case ActionType.GO_TO_MOVIE_PAGE:
      return extend(state, {
        currentMovie: action.payload,
        currentGenre: action.payload.genre,
        currentPage: Pages.MOVIE,
        isMainPage: false,
      });

    default:
      return state;
  }
};
