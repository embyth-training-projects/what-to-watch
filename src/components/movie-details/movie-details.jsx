import React from "react";

import CustomPropTypes from "../../helpers/custom-prop-types";

const getActorsList = (actors) => {
  return actors.map((actor) => (
    <React.Fragment key={actor}>
      {actor} <br />
    </React.Fragment>
  ));
};

const MovieDetails = ({movie}) => (
  <div className="movie-card__text movie-card__row">
    <div className="movie-card__text-col">
      <p className="movie-card__details-item">
        <strong className="movie-card__details-name">Director</strong>
        <span className="movie-card__details-value">{movie.director}</span>
      </p>
      <p className="movie-card__details-item">
        <strong className="movie-card__details-name">Starring</strong>
        <span className="movie-card__details-value">
          {getActorsList(movie.starring)}
        </span>
      </p>
    </div>

    <div className="movie-card__text-col">
      <p className="movie-card__details-item">
        <strong className="movie-card__details-name">Run Time</strong>
        <span className="movie-card__details-value">{movie.runTime}</span>
      </p>
      <p className="movie-card__details-item">
        <strong className="movie-card__details-name">Genre</strong>
        <span className="movie-card__details-value">{movie.genre}</span>
      </p>
      <p className="movie-card__details-item">
        <strong className="movie-card__details-name">Released</strong>
        <span className="movie-card__details-value">{movie.date}</span>
      </p>
    </div>
  </div>
);

MovieDetails.propTypes = {
  movie: CustomPropTypes.MOVIE,
};

export default MovieDetails;
