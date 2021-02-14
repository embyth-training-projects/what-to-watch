import moment from "moment";

import {ALL_GENRES} from "./const";

export const extend = (state, newStateValue) => {
  return Object.assign({}, state, newStateValue);
};

export const getMoviesGenres = (movies) => {
  return [ALL_GENRES, ...new Set(movies.map((movie) => movie.genre))];
};

export const getMovieReviews = (allReviews, currentMovie) => {
  return allReviews.filter((review) => review.movie === currentMovie.title)[0];
};

export const getMoreLikeThisMovies = (movies, currentMovie) => {
  return movies.filter((movie) => movie.genre === currentMovie.genre && movie.title !== currentMovie.title);
};

export const getLeftColumnReviews = (reviews) => {
  const sliceIndex = Math.ceil(reviews.length / 2);
  return reviews.slice(0, sliceIndex);
};

export const getRightColumnReviews = (reviews) => {
  const sliceIndex = Math.ceil(reviews.length / 2);
  return reviews.slice(sliceIndex, reviews.length);
};

export const filterMoviesByGenre = (allMovies, currentGenre) => {
  if (currentGenre === ALL_GENRES) {
    return allMovies;
  }

  return allMovies.filter((movie) => movie.genre === currentGenre);
};

export const getRatingLevel = (rating) => {
  if (rating >= 0 && rating < 3) {
    return `Bad`;
  } else if (rating >= 3 && rating < 5) {
    return `Normal`;
  } else if (rating >= 5 && rating < 8) {
    return `Good`;
  } else if (rating >= 8 && rating < 10) {
    return `Very good`;
  } else if (rating === 10) {
    return `Awesome`;
  } else {
    return `Not rated`;
  }
};

export const getRunTimeFormat = (runTime) => {
  const duration = moment.duration(runTime, `minutes`);
  return `${duration.get(`hours`)}h ${duration.get(`minutes`)}m`;
};

export const getReviewFormatDate = (date) => {
  return moment(date).format(`MMMM D, YYYY`);
};

export const convertDateToISO = (date) => {
  return moment(date).toISOString();
};

export const getFormatRating = (rating) => {
  return (rating % 1 !== 0) ? rating.toString().split(`.`).join(`,`) : `${rating.toString()},0`;
};
