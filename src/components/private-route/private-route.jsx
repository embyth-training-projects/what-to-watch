import React from "react";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {PropTypes} from "prop-types";

import {getAuthorizationStatus} from "../../store/user/selectors";
import {AppRoute, AuthorizationStatus} from "../../helpers/const";

const PrivateRoute = (props) => {
  const {exact, path, render, authorizationStatus} = props;

  return (
    <Route
      exact={exact}
      path={path}
      render={(routeProps) => authorizationStatus === AuthorizationStatus.AUTH ? render(routeProps) : <Redirect to={AppRoute.SIGN_IN} />}
    />
  );
};

PrivateRoute.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

export default connect(mapStateToProps)(PrivateRoute);
