import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import history from "../../history";

import VideoPlayer from "../video-player/video-player";

import {CustomPropTypes} from "../../helpers/custom-prop-types";
import {AppRoute} from "../../helpers/const";

class MovieCard extends PureComponent {
  constructor(props) {
    super(props);

    this._handleMovieCardClick = this._handleMovieCardClick.bind(this);
  }

  _handleMovieCardClick(evt) {
    const {movie} = this.props;

    evt.preventDefault();
    history.push(`${AppRoute.MOVIE}/${movie.id}`);
  }

  render() {
    const {movie, isPlaying, onMovieCardMouseEnter, onMovieCardMouseOut} = this.props;

    return (
      <article
        className="small-movie-card catalog__movies-card"
        onMouseEnter={() => onMovieCardMouseEnter()}
        onMouseOut={() => onMovieCardMouseOut()}
        onClick={this._handleMovieCardClick}
      >
        <div className="small-movie-card__image">
          <VideoPlayer
            muted
            isPlaying={isPlaying}
            source={movie.preview}
            poster={movie.previewImage}
          />
        </div>
        <h3 className="small-movie-card__title">
          <Link className="small-movie-card__link" to={`${AppRoute.MOVIE}/${movie.id}`}>{movie.title}</Link>
        </h3>
      </article>
    );
  }
}

MovieCard.propTypes = {
  movie: CustomPropTypes.MOVIE,
  isPlaying: PropTypes.bool.isRequired,
  onMovieCardMouseEnter: PropTypes.func.isRequired,
  onMovieCardMouseOut: PropTypes.func.isRequired,
};

export default MovieCard;
