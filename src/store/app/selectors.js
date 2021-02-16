import NameSpace from "../name-space";

export const getCurrentMovie = (state) => state[NameSpace.APP].currentMovie;

export const getCurrentGenre = (state) => state[NameSpace.APP].currentGenre;

export const getCurrentPage = (state) => state[NameSpace.APP].currentPage;

export const getIsMoviePlayerActive = (state) => state[NameSpace.APP].isMoviePlayerActive;
