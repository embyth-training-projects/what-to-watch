import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

import VideoPlayer from "../video-player/video-player";

import {CustomPropTypes} from "../../helpers/custom-prop-types";
import {AppRoute} from "../../helpers/const";

const MovieCard = ({movie, isPlaying, onMovieCardMouseEnter, onMovieCardMouseOut}) =>(
  <article
    className="small-movie-card catalog__movies-card"
    onMouseEnter={onMovieCardMouseEnter}
    onMouseOut={onMovieCardMouseOut}
  >
    <Link to={`${AppRoute.MOVIE}/${movie.id}`} className="small-movie-card__link">
      <div className="small-movie-card__image">
        <VideoPlayer
          muted
          isPlaying={isPlaying}
          source={movie.preview}
          poster={movie.previewImage}
        />
      </div>
      <h3 className="small-movie-card__title">
        {movie.title}
      </h3>
    </Link>
  </article>
);

MovieCard.propTypes = {
  movie: CustomPropTypes.MOVIE,
  isPlaying: PropTypes.bool.isRequired,
  onMovieCardMouseEnter: PropTypes.func.isRequired,
  onMovieCardMouseOut: PropTypes.func.isRequired,
};

export default MovieCard;
