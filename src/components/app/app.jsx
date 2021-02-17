import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";

import MainPage from "../main-page/main-page";
import MoviePage from "../movie-page/movie-page";
import MoviePlayer from "../movie-player/movie-player";
import SignIn from "../sign-in/sign-in";
import ErrorScreen from "../error-screen/error-screen";

import withVideoControls from "../../hocs/with-video-controls/with-video-controls";

import {getCurrentPage, getIsMoviePlayerActive} from "../../store/app/selectors";
import {getIsError} from "../../store/data/selectors";
import {getAuthorizationStatus} from "../../store/user/selectors";

import {Pages} from "../../helpers/const";

const MoviePlayerWrapped = withVideoControls(MoviePlayer);

class App extends PureComponent {
  _renderApp() {
    const {currentPage, isMoviePlayerActive, isError} = this.props;

    if (isError) {
      return (
        <ErrorScreen />
      );
    }

    if (isMoviePlayerActive) {
      return (
        <MoviePlayerWrapped />
      );
    }

    switch (currentPage) {
      case Pages.MAIN:
        return (
          <MainPage />
        );

      case Pages.MOVIE:
        return (
          <MoviePage />
        );

      case Pages.SIGN_IN:
        return (
          <SignIn />
        );

      default:
        return (
          <MainPage />
        );
    }
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/movie">
            <MoviePage />
          </Route>
          <Route exact path="/watch">
            <MoviePlayerWrapped />
          </Route>
          <Route exact path="/auth">
            <SignIn />
          </Route>
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  currentPage: PropTypes.string.isRequired,
  isMoviePlayerActive: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  currentPage: getCurrentPage(state),
  isMoviePlayerActive: getIsMoviePlayerActive(state),
  isError: getIsError(state),
  authorizationStatus: getAuthorizationStatus(state),
});

export {App};
export default connect(mapStateToProps)(App);
