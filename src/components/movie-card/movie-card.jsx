import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import VideoPlayer from "../video-player/video-player";

import {ActionCreator} from "../../store/app/app";
import {Operations as DataOperations} from "../../store/data/data";

import {CustomPropTypes} from "../../helpers/custom-prop-types";

class MovieCard extends PureComponent {
  constructor(props) {
    super(props);

    this._handleMovieCardClick = this._handleMovieCardClick.bind(this);
  }

  _handleMovieCardClick(evt) {
    const {movie, onMovieCardClick} = this.props;

    evt.preventDefault();
    onMovieCardClick(movie);
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
            poster={movie.poster}
          />
        </div>
        <h3 className="small-movie-card__title">
          <a className="small-movie-card__link" href="movie-page.html">{movie.title}</a>
        </h3>
      </article>
    );
  }
}

MovieCard.propTypes = {
  movie: CustomPropTypes.MOVIE,
  isPlaying: PropTypes.bool.isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
  onMovieCardMouseEnter: PropTypes.func.isRequired,
  onMovieCardMouseOut: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onMovieCardClick(movie) {
    dispatch(ActionCreator.goToMoviePage());
    dispatch(ActionCreator.setCurrentMovie(movie));
    dispatch(ActionCreator.setCurrentGenre(movie.genre));
    dispatch(DataOperations.loadMovieReviews()); // нужно будет передать id фильма
  }
});

export {MovieCard};
export default connect(null, mapDispatchToProps)(MovieCard);
