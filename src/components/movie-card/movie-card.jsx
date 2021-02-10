import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import VideoPlayer from "../video-player/video-player";

export default class MovieCard extends PureComponent {
  constructor(props) {
    super(props);

    this._movie = props.movie;

    this.state = {
      isPlaying: false,
    };

    this._handleMovieCardClick = this._handleMovieCardClick.bind(this);
  }

  _handleMovieCardClick(evt) {
    evt.preventDefault();

    this.props.onMovieCardClick(this._movie);
  }

  render() {
    return (
      <article
        className="small-movie-card catalog__movies-card"
        onMouseOver={() => this.props.onMovieCardMouseOver(this._movie)}
        onMouseEnter={() => this.setState({isPlaying: true})}
        onMouseOut={() => this.setState({isPlaying: false})}
        onClick={this._handleMovieCardClick}
      >
        <div className="small-movie-card__image">
          <VideoPlayer
            muted
            isPlaying={this.state.isPlaying}
            source={this._movie.preview}
            poster={this._movie.poster}
          />
        </div>
        <h3 className="small-movie-card__title">
          <a className="small-movie-card__link" href="movie-page.html">{this._movie.title}</a>
        </h3>
      </article>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
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
  onMovieCardMouseOver: PropTypes.func.isRequired,
};
