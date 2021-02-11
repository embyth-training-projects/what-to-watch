import React from "react";
import PropTypes from "prop-types";

import MoviesList from "../movies-list/movies-list";

const MAX_SIMILAR_MOVIES_AMOUNT = 4;

export const getFilteredMovies = (movies, currentMovie) => {
  return movies.filter((movie) => movie.genre === currentMovie.genre && movie !== currentMovie);
};

const MoviesLikeThis = ({movies, currentMovie, onMovieCardClick}) => {
  const filteredMovies = getFilteredMovies(movies, currentMovie).slice(0, MAX_SIMILAR_MOVIES_AMOUNT);

  return (
    <section className="catalog catalog--like-this">
      <h2 className="catalog__title">More like this</h2>

      {filteredMovies.length === 0
        ? null
        : <MoviesList
          movies={filteredMovies}
          onMovieCardClick={onMovieCardClick}
        />}
    </section>
  );
};

MoviesLikeThis.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    background: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    description: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    rating: PropTypes.string.isRequired,
    ratingDescription: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    preview: PropTypes.string.isRequired,
  })).isRequired,
  currentMovie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    background: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    description: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    rating: PropTypes.string.isRequired,
    ratingDescription: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    preview: PropTypes.string.isRequired,
  }).isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
};

export default MoviesLikeThis;
