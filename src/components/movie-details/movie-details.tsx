import * as React from "react";

import {MovieInterface} from "../../helpers/types";
import {getRunTimeFormat} from "../../helpers/utils";

interface MovieDetailsProps {
  movie: MovieInterface;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({movie}: MovieDetailsProps) => (
  <div className="movie-card__text movie-card__row">
    <div className="movie-card__text-col">
      <p className="movie-card__details-item">
        <strong className="movie-card__details-name">Director</strong>
        <span className="movie-card__details-value">{movie.director}</span>
      </p>
      <p className="movie-card__details-item">
        <strong className="movie-card__details-name">Starring</strong>
        <span className="movie-card__details-value">
          {movie.starring.map((actor) => (
            <React.Fragment key={actor}>
              {actor} <br />
            </React.Fragment>
          ))}
        </span>
      </p>
    </div>

    <div className="movie-card__text-col">
      <p className="movie-card__details-item">
        <strong className="movie-card__details-name">Run Time</strong>
        <span className="movie-card__details-value">{getRunTimeFormat(movie.runTime)}</span>
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

export default MovieDetails;
