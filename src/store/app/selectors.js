import NameSpace from "../name-space";
import {getMovies} from "../data/selectors";

export const getCurrentMovie = (state) => state[NameSpace.APP].currentMovie;

export const getCurrentGenre = (state) => state[NameSpace.APP].currentGenre;

export const getCurrentPage = (state) => state[NameSpace.APP].currentPage;

export const getIsMoviePlayerActive = (state) => state[NameSpace.APP].isMoviePlayerActive;

export const getCurrentMovieById = (state, ownProps) => {
  const movies = getMovies(state);
  const movieId = parseInt(ownProps.routeProps.match.params.id, 10);
  const [currentMovie] = movies.filter((movie) => movie.id === movieId);

  return currentMovie;
};
