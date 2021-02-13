import React from "react";
import PropTypes from "prop-types";

import MovieCard from "../movie-card/movie-card";

import withActiveVideo from "../../hocs/with-active-video/with-active-video";

import {CustomPropTypes} from "../../helpers/custom-prop-types";

const MovieCardWrapped = withActiveVideo(MovieCard);

const MoviesList = ({movies, render}) => (
  <React.Fragment>
    <div className="catalog__movies-list">
      {movies.map((movie) => (
        <MovieCardWrapped
          key={movie.id}
          movie={movie}
        />
      ))}
    </div>
    {render()}
  </React.Fragment>
);

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(CustomPropTypes.MOVIE).isRequired,
  render: PropTypes.func.isRequired,
};

export default MoviesList;
