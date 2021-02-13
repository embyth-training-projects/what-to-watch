import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";

import MainPage from "../main-page/main-page";
import MoviePage from "../movie-page/movie-page";

import {Pages} from "../../helpers/const";

class App extends PureComponent {
  _renderApp() {
    const {currentPage} = this.props;

    switch (currentPage) {
      case Pages.MAIN:
        return (
          <MainPage />
        );

      case Pages.MOVIE:
        return (
          <MoviePage />
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
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  currentPage: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  currentPage: state.currentPage,
});

export {App};
export default connect(mapStateToProps)(App);
