import React from "react";
import PropTypes from "prop-types";

import MoviesList from "../movies-list/movies-list";

import CustomPropTypes from "../../utils/custom-prop-types";

const MAX_SIMILAR_MOVIES_AMOUNT = 4;

export const getFilteredMovies = (movies, currentMovie) => {
  return movies.filter((movie) => movie.genre === currentMovie.genre && movie.title !== currentMovie.title);
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
  movies: PropTypes.arrayOf(CustomPropTypes.MOVIE).isRequired,
  currentMovie: CustomPropTypes.MOVIE,
  onMovieCardClick: PropTypes.func.isRequired,
};

export default MoviesLikeThis;
