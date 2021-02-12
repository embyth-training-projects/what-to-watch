import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";

import MainPage from "../main-page/main-page";
import MoviePage from "../movie-page/movie-page";

import {CustomPropTypes} from "../../helpers/custom-prop-types";
import {getMovieReviews} from "../../helpers/utils";
import {Pages} from "../../helpers/const";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: Pages.MAIN,
      currentMovie: props.currentMovie,
      isMainPage: true,
    };

    this._handleMovieCardClick = this._handleMovieCardClick.bind(this);
  }

  _handleMovieCardClick(movie) {
    this.setState({
      currentPage: Pages.MOVIE,
      currentMovie: movie,
      isMainPage: false,
    });
  }

  _renderApp() {
    const {movies, moviesReviews} = this.props;
    const {currentPage, currentMovie, isMainPage} = this.state;

    const currentMovieReviews = getMovieReviews(moviesReviews, currentMovie);

    if (currentPage === Pages.MAIN) {
      return (
        <MainPage
          isMainPage={isMainPage}
          onMovieCardClick={this._handleMovieCardClick}
        />
      );
    }

    if (currentPage === Pages.MOVIE) {
      return (
        <MoviePage
          isMainPage={isMainPage}
          movie={currentMovie}
          movies={movies}
          reviews={currentMovieReviews}
          onMovieCardClick={this._handleMovieCardClick}
        />
      );
    }

    return null;
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/film">
            <MoviePage
              isMainPage={this.state.isMainPage}
              movie={this.state.currentMovie}
              movies={this.props.movies}
              reviews={getMovieReviews(this.props.moviesReviews, this.state.currentMovie)}
              onMovieCardClick={this._handleMovieCardClick}
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
  moviesReviews: PropTypes.arrayOf(CustomPropTypes.REVIEW).isRequired,
};

const mapStateToProps = (state) => ({
  movies: state.movies,
  currentMovie: state.currentMovie,
  moviesReviews: state.moviesReviews,
});

export {App};
export default connect(mapStateToProps)(App);
