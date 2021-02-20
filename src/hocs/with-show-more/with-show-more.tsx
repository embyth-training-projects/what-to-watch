import * as React from "react";
import {connect} from "react-redux";

import ShowMoreButton from "../../components/show-more-button/show-more-button";

import {getFilteredMoviesLikeThis, getFilteredMoviesByGenre} from "../../store/data/selectors";

import {MovieInterface} from "../../helpers/types";
import {MOVIES_SHOWN, Pages} from "../../helpers/const";

interface WithShowMoreProps {
  movies: Array<MovieInterface>;
}

interface WithShowMoreState {
  moviesShown: Array<MovieInterface>;
}

const withShowMore = (Component) => {
  class WithShowMore extends React.PureComponent<WithShowMoreProps, WithShowMoreState> {
    constructor(props) {
      super(props);

      this.state = {
        moviesShown: props.movies.slice(0, MOVIES_SHOWN),
      };

      this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
      this._renderShowMoreButton = this._renderShowMoreButton.bind(this);
    }

    private _handleShowMoreButtonClick() {
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

    private _renderShowMoreButton() {
      return (this.props.movies.length > this.state.moviesShown.length && <ShowMoreButton onShowMoreButtonClick={this._handleShowMoreButtonClick} />);
    }

    componentDidUpdate(prevProps) {
      if (prevProps !== this.props) {
        this.setState({
          moviesShown: this.props.movies.slice(0, MOVIES_SHOWN),
        });
      }
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

  const mapStateToProps = (state, ownProps) => ({
    movies: ownProps.currentPage === Pages.MAIN ? getFilteredMoviesByGenre(state) : getFilteredMoviesLikeThis(state)
  });

  return connect(mapStateToProps)(WithShowMore);
};

export default withShowMore;
