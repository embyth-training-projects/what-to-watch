import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import MovieCard from "../movie-card/movie-card";
import ShowMoreButton from "../show-more-button/show-more-button";

import {CustomPropTypes} from "../../helpers/custom-prop-types";
import {MOVIES_SHOWN} from "../../helpers/const";

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentMovie: null,
      moviesShown: props.moviesByGenre.slice(0, MOVIES_SHOWN),

    };

    this._handleMovieCardMouseOver = this._handleMovieCardMouseOver.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
  }

  _handleMovieCardMouseOver(movie) {
    this.setState({currentMovie: movie});
  }

  _handleShowMoreButtonClick() {
    this.setState((prevState) => ({
      moviesShown: [
        ...prevState.moviesShown,
        ...this.props.moviesByGenre.slice(
            prevState.moviesShown.length,
            prevState.moviesShown.length + MOVIES_SHOWN
        ),
      ]
    }));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentGenre !== this.props.currentGenre) {
      this.setState({
        moviesShown: this.props.moviesByGenre.slice(0, MOVIES_SHOWN),
      });
    }
  }

  render() {
    const {moviesByGenre, onMovieCardClick} = this.props;
    const {moviesShown} = this.state;

    return (
      <React.Fragment>
        <div className="catalog__movies-list">
          {moviesShown.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onMovieCardClick={onMovieCardClick}
              onMovieCardMouseOver={this._handleMovieCardMouseOver}
            />
          ))}
        </div>
        {moviesByGenre.length > moviesShown.length && <ShowMoreButton onShowMoreButtonClick={this._handleShowMoreButtonClick} />}
      </React.Fragment>
    );
  }
}

MoviesList.propTypes = {
  onMovieCardClick: PropTypes.func.isRequired,
  moviesByGenre: PropTypes.arrayOf(CustomPropTypes.MOVIE).isRequired,
  currentGenre: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  currentGenre: state.currentGenre,
  moviesByGenre: state.moviesByGenre,
});

export {MoviesList};
export default connect(mapStateToProps)(MoviesList);
