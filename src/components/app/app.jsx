import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import MainPage from "../main-page/main-page";
import MoviePage from "../movie-page/movie-page";

import CustomPropTypes from "../../utils/custom-prop-types";

export default class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: `main`,
      currentMovie: this.props.promoMovie,
    };

    this._handleMovieCardClick = this._handleMovieCardClick.bind(this);
  }

  _handleMovieCardClick(movie) {
    this.setState({
      currentPage: `film`,
      currentMovie: movie,
    });
  }

  _renderApp() {
    const {promoMovie, movieCards} = this.props;
    const {currentPage, currentMovie} = this.state;

    if (currentPage === `main`) {
      return (
        <MainPage
          promoMovie={promoMovie}
          movieCards={movieCards}
          onMovieCardClick={this._handleMovieCardClick}
        />
      );
    }

    if (currentPage === `film`) {
      return (
        <MoviePage
          movie={currentMovie}
          movies={movieCards}
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
};
