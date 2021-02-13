import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import ShowMoreButton from "../../components/show-more-button/show-more-button";

import {CustomPropTypes} from "../../helpers/custom-prop-types";
import {filterMoviesByGenre} from "../../helpers/utils";
import {MOVIES_LIKE_THIS_SHOWN, MOVIES_SHOWN, Pages} from "../../helpers/const";

const withShowMore = (Component) => {
  class WithShowMore extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        moviesShown: props.movies.slice(0, MOVIES_SHOWN),
      };

      this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
      this._renderShowMoreButton = this._renderShowMoreButton.bind(this);
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
      if (prevProps !== this.props) {
        this.setState({
          moviesShown: this.props.movies.slice(0, MOVIES_SHOWN),
        });
      }
    }

    _renderShowMoreButton() {
      return (this.props.movies.length > this.state.moviesShown.length && <ShowMoreButton onShowMoreButtonClick={this._handleShowMoreButtonClick} />);
    }

    render() {
      return (
        <Component
          {...this.props}
          render={this._renderShowMoreButton}
          movies={this.state.moviesShown}
        />
      );
    }
  }

  WithShowMore.propTypes = {
    movies: PropTypes.arrayOf(CustomPropTypes.MOVIE).isRequired,
  };

  const mapStateToProps = (state) => {
    if (state.currentPage !== Pages.MAIN) {
      return {
        currentGenre: state.currentGenre,
        movies: filterMoviesByGenre(state.movies, state.currentGenre)
        .filter((movie) => movie.title !== state.currentMovie.title)
        .slice(0, MOVIES_LIKE_THIS_SHOWN),
      };
    }

    return {
      currentGenre: state.currentGenre,
      movies: filterMoviesByGenre(state.movies, state.currentGenre),
    };
  };

  return connect(mapStateToProps)(WithShowMore);
};

export default withShowMore;
