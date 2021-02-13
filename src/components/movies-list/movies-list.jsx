import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import MovieCard from "../movie-card/movie-card";
import ShowMoreButton from "../show-more-button/show-more-button";

import {filterMoviesByGenre} from "../../helpers/utils";
import {CustomPropTypes} from "../../helpers/custom-prop-types";
import {MOVIES_SHOWN} from "../../helpers/const";

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      moviesShown: props.movies.slice(0, MOVIES_SHOWN),
    };

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
  }

  _handleShowMoreButtonClick() {
    this.setState((prevState) => ({
      moviesShown: [
        ...prevState.moviesShown,
        ...this.props.movies.slice(
            prevState.moviesShown.length,
            prevState.moviesShown.length + MOVIES_SHOWN
        ),
      ]
    }));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentGenre !== this.props.currentGenre) {
      this.setState({
        moviesShown: this.props.movies.slice(0, MOVIES_SHOWN),
      });
    }
  }

  render() {
    const {movies} = this.props;
    const {moviesShown} = this.state;

    return (
      <React.Fragment>
        <div className="catalog__movies-list">
          {moviesShown.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          ))}
        </div>
        {movies.length > moviesShown.length && <ShowMoreButton onShowMoreButtonClick={this._handleShowMoreButtonClick} />}
      </React.Fragment>
    );
  }
}

MoviesList.propTypes = {
  currentGenre: PropTypes.string.isRequired,
  movies: PropTypes.arrayOf(CustomPropTypes.MOVIE).isRequired,
};

const mapStateToProps = (state) => ({
  currentGenre: state.currentGenre,
  movies: filterMoviesByGenre(state.movies, state.currentGenre),
});

export {MoviesList};
export default connect(mapStateToProps)(MoviesList);
