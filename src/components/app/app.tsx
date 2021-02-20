import * as React from "react";
import {Router, Route, Switch, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import history from "../../history";

import {getIsLoadError, getIsLoading} from "../../store/data/selectors";
import {getAuthorizationStatus, getIsAuthorizationProcessFinished} from "../../store/user/selectors";

import withVideoControls from "../../hocs/with-video-controls/with-video-controls";
import withReview from "../../hocs/with-review/with-review";

import Loader from "../loader/loader";
import MainPage from "../main-page/main-page";
import MoviePage from "../movie-page/movie-page";
import MoviePlayer from "../movie-player/movie-player";
import SignIn from "../sign-in/sign-in";
import AddReview from "../add-review/add-review";
import MyList from "../my-list/my-list";
import ErrorScreen from "../error-screen/error-screen";
import PrivateRoute from "../private-route/private-route";

import {AppRoute, AuthorizationStatus} from "../../helpers/const";

const MoviePlayerWrapped = withVideoControls(MoviePlayer);
const AddReviewWrapped = withReview(AddReview);

interface AppProps {
  isLoadError: boolean;
  isLoading: boolean;
  isAuthorizationProcessFinished: boolean;
  authorizationStatus: string;
}

const App: React.FC<AppProps> = ({
  isLoadError, isLoading, isAuthorizationProcessFinished, authorizationStatus
}: AppProps) => (
  <React.Fragment>
    {isLoading && !isAuthorizationProcessFinished
      ? <Loader />
      : <Router history={history}>
        <Switch>
          <Route exact path={AppRoute.ROOT}
            render={() => isLoadError ? <ErrorScreen /> : <MainPage />}
          />

          <Route exact path={AppRoute.SIGN_IN}
            render={() => authorizationStatus === AuthorizationStatus.NOT_AUTH ? <SignIn /> : <Redirect to={AppRoute.ROOT} />}
          />

          <Route exact path={`${AppRoute.MOVIE}/:id`}
            render={(routeProps) => <MoviePage routeProps={routeProps} />}
          />

          <Route exact path={`${AppRoute.PLAYER}/:id`}
            render={(routeProps) => <MoviePlayerWrapped routeProps={routeProps} />}
          />

          <PrivateRoute exact path={`${AppRoute.MOVIE}/:id${AppRoute.ADD_REVIEW}`}
            render={(routeProps) => <AddReviewWrapped routeProps={routeProps} />}
          />

          <PrivateRoute exact path={AppRoute.MY_LIST}
            render={() => <MyList />}
          />

          <Route component={ErrorScreen} />
        </Switch>
      </Router>
    }
  </React.Fragment>
);

const mapStateToProps = (state) => ({
  isLoadError: getIsLoadError(state),
  isLoading: getIsLoading(state),
  isAuthorizationProcessFinished: getIsAuthorizationProcessFinished(state),
  authorizationStatus: getAuthorizationStatus(state),
});

export {App};
export default connect(mapStateToProps)(App);
