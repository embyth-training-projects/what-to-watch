import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";

import MainPage from "../main-page/main-page";
import MoviePage from "../movie-page/movie-page";
import MoviePlayer from "../movie-player/movie-player";
import SignIn from "../sign-in/sign-in";
import AddReview from "../add-review/add-review";
import ErrorScreen from "../error-screen/error-screen";

import withVideoControls from "../../hocs/with-video-controls/with-video-controls";
import withReview from "../../hocs/with-review/with-review";

import {getCurrentPage, getIsMoviePlayerActive} from "../../store/app/selectors";
import {getIsLoadError} from "../../store/data/selectors";
import {getAuthorizationStatus} from "../../store/user/selectors";

import {Pages} from "../../helpers/const";

const MoviePlayerWrapped = withVideoControls(MoviePlayer);
const AddReviewWrapped = withReview(AddReview);

class App extends PureComponent {
  _renderApp() {
    const {currentPage, isMoviePlayerActive, isLoadError} = this.props;

    if (isLoadError) {
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

      case Pages.ADD_REVIEW:
        return (
          <AddReviewWrapped />
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
          <Route exact path="/review">
            <AddReviewWrapped />
          </Route>
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  currentPage: PropTypes.string.isRequired,
  isMoviePlayerActive: PropTypes.bool.isRequired,
  isLoadError: PropTypes.bool.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  currentPage: getCurrentPage(state),
  isMoviePlayerActive: getIsMoviePlayerActive(state),
  isLoadError: getIsLoadError(state),
  authorizationStatus: getAuthorizationStatus(state),
});

export {App};
export default connect(mapStateToProps)(App);
