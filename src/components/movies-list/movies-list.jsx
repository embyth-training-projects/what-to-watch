import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import MovieCard from "../movie-card/movie-card";

export default class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentMovie: null,
    };

    this._handleMovieCardMouseOver = this._handleMovieCardMouseOver.bind(this);
  }

  _handleMovieCardMouseOver(movie) {
    this.setState({currentMovie: movie});
  }

  render() {
    const {movies, onMovieCardClick} = this.props;

    return (
      <div className="catalog__movies-list">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onMovieCardClick={onMovieCardClick}
            onMovieCardMouseOver={this._handleMovieCardMouseOver}
          />
        ))}
      </div>
    );
  }
}

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
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
  })).isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
};
