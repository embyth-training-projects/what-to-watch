import * as React from "react";
import {Route, Redirect} from "react-router-dom";
import {RouterProps} from "react-router";
import {connect} from "react-redux";

import {getAuthorizationStatus} from "../../store/user/selectors";
import {AppRoute, AuthorizationStatus} from "../../helpers/const";

interface PrivateRouteProps {
  authorizationStatus: string;
  exact: boolean;
  path: string;
  render(routeProps: RouterProps): React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  exact, path, render, authorizationStatus
}: PrivateRouteProps) => (
  <Route
    exact={exact}
    path={path}
    render={(routeProps) => authorizationStatus === AuthorizationStatus.AUTH ? render(routeProps) : <Redirect to={AppRoute.SIGN_IN} />}
  />
);

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

export default connect(mapStateToProps)(PrivateRoute);
