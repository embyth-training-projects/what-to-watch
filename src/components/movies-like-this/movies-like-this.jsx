import React from "react";
import PropTypes from "prop-types";

import MoviesList from "../movies-list/movies-list";

import {CustomPropTypes} from "../../helpers/custom-prop-types";
import {getMoreLikeThisMovies} from "../../helpers/utils";

const MAX_SIMILAR_MOVIES_AMOUNT = 4;

const MoviesLikeThis = ({movies, currentMovie, onMovieCardClick}) => {
  const filteredMovies = getMoreLikeThisMovies(movies, currentMovie).slice(0, MAX_SIMILAR_MOVIES_AMOUNT);

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
