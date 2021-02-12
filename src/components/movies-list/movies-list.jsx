import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import MovieCard from "../movie-card/movie-card";

import CustomPropTypes from "../../helpers/custom-prop-types";

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
  movies: PropTypes.arrayOf(CustomPropTypes.MOVIE).isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
};
