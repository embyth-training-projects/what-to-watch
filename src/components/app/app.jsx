import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";

import MainPage from "../main-page/main-page";
import MoviePage from "../movie-page/movie-page";

import {CustomPropTypes} from "../../helpers/custom-prop-types";
import {getMovieReviews} from "../../helpers/utils";
import {Pages} from "../../helpers/const";

import {ActionCreator} from "../../reducer/reducer";

class App extends PureComponent {
  _renderApp() {
    const {movies, moviesReviews, currentPage, currentMovie, isMainPage, onMovieCardClick} = this.props;

    switch (currentPage) {
      case Pages.MAIN:
        return (
          <MainPage
            isMainPage={isMainPage}
            onMovieCardClick={onMovieCardClick}
          />
        );

      case Pages.MOVIE:
        return (
          <MoviePage
            isMainPage={isMainPage}
            movie={currentMovie}
            movies={movies}
            reviews={getMovieReviews(moviesReviews, currentMovie)}
            onMovieCardClick={onMovieCardClick}
          />
        );

      default:
        return (
          <MainPage
            isMainPage={isMainPage}
            onMovieCardClick={onMovieCardClick}
          />
        );
    }
  }

  render() {
    const {movies, moviesReviews, currentMovie, isMainPage, onMovieCardClick} = this.props;

    return (
      <Router>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/movie">
            <MoviePage
              isMainPage={isMainPage}
              movie={currentMovie}
              movies={movies}
              reviews={getMovieReviews(moviesReviews, currentMovie)}
              onMovieCardClick={onMovieCardClick}
            />
          </Route>
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  movies: PropTypes.arrayOf(CustomPropTypes.MOVIE).isRequired,
  currentMovie: CustomPropTypes.MOVIE,
  currentPage: PropTypes.string.isRequired,
  isMainPage: PropTypes.bool.isRequired,
  moviesReviews: PropTypes.arrayOf(CustomPropTypes.REVIEW).isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  movies: state.movies,
  currentMovie: state.currentMovie,
  currentPage: state.currentPage,
  isMainPage: state.isMainPage,
  moviesReviews: state.moviesReviews,
});

const mapDispatchToProps = (dispatch) => ({
  onMovieCardClick(movie) {
    dispatch(ActionCreator.goToMoviePage(movie));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
