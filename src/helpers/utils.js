import {ALL_GENRES} from "./const";

export const extend = (state, newStateValue) => {
  return Object.assign({}, state, newStateValue);
};

export const getMoviesGenres = (movies) => {
  return [ALL_GENRES].concat(...new Set(movies.map((movie) => movie.genre)));
};

export const getMovieReviews = (allReviews, currentMovie) => {
  return allReviews.filter((review) => review.movie === currentMovie.title)[0];
};

export const getMoreLikeThisMovies = (movies, currentMovie) => {
  return movies.filter((movie) => movie.genre === currentMovie.genre && movie.title !== currentMovie.title);
};

export const getMachineReadableDate = (date) => {
  return new Date(date).toISOString().slice(0, 10);
};

export const getLeftColumnReviews = (reviews) => {
  const sliceIndex = Math.ceil(reviews.length / 2);
  return reviews.slice(0, sliceIndex);
};

export const getRightColumnReviews = (reviews) => {
  const sliceIndex = Math.ceil(reviews.length / 2);
  return reviews.slice(sliceIndex, reviews.length);
};
