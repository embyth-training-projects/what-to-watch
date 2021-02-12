import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import MainPage from "../main-page/main-page";
import MoviePage from "../movie-page/movie-page";

import CustomPropTypes from "../../helpers/custom-prop-types";
import {Pages} from "../../helpers/const";

export default class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: Pages.MAIN,
      currentMovie: this.props.promoMovie,
    };

    this._handleMovieCardClick = this._handleMovieCardClick.bind(this);
  }

  _handleMovieCardClick(movie) {
    this.setState({
      currentPage: Pages.MOVIE,
      currentMovie: movie,
    });
  }

  _getCurrentMovieReviews(allReviews, currentMovie) {
    return allReviews.filter((reviews) => reviews.movie === currentMovie.title)[0];
  }

  _renderApp() {
    const {promoMovie, movieCards, moviesReviews} = this.props;
    const {currentPage, currentMovie} = this.state;

    const currentMovieReviews = this._getCurrentMovieReviews(moviesReviews, currentMovie);

    if (currentPage === Pages.MAIN) {
      return (
        <MainPage
          promoMovie={promoMovie}
          movieCards={movieCards}
          onMovieCardClick={this._handleMovieCardClick}
        />
      );
    }

    if (currentPage === Pages.MOVIE) {
      return (
        <MoviePage
          movie={currentMovie}
          movies={movieCards}
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
              movie={this.state.currentMovie}
              movies={this.props.movieCards}
              reviews={this._getCurrentMovieReviews(this.props.moviesReviews, this.state.currentMovie)}
              onMovieCardClick={this._handleMovieCardClick}
            />
          </Route>
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  movieCards: PropTypes.arrayOf(CustomPropTypes.MOVIE).isRequired,
  promoMovie: CustomPropTypes.MOVIE,
  moviesReviews: PropTypes.arrayOf(CustomPropTypes.REVIEW).isRequired,
};
