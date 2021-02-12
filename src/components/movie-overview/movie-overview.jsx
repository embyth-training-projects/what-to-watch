import React from "react";

import {CustomPropTypes} from "../../helpers/custom-prop-types";

const MovieOverview = ({movie}) => (
  <React.Fragment>
    <div className="movie-rating">
      <div className="movie-rating__score">{movie.rating}</div>
      <p className="movie-rating__meta">
        <span className="movie-rating__level">{movie.ratingDescription}</span>
        <span className="movie-rating__count">{movie.votes} ratings</span>
      </p>
    </div>

    <div className="movie-card__text">
      {movie.description.map((description, index) => (
        <p key={movie.id + index}>{description}</p>
      ))}

      <p className="movie-card__director"><strong>Director: {movie.director}</strong></p>

      <p className="movie-card__starring"><strong>Starring: {movie.starring.join(`, `)} and other</strong></p>
    </div>
  </React.Fragment>
);

MovieOverview.propTypes = {
  movie: CustomPropTypes.MOVIE,
};

export default MovieOverview;
