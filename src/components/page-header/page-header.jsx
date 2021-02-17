import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {getCurrentPage} from "../../store/app/selectors";
import {ActionCreator} from "../../store/app/app";
import {getAuthorizationStatus} from "../../store/user/selectors";

import {Pages, AuthorizationStatus} from "../../helpers/const";

const PageHeader = ({isMainPage, isSignInPage, isAuth, onSignInClick}) => {
  const signInPageTitle = (
    <React.Fragment>
      <h1 className="page-title user-page__title">Sign in</h1>
    </React.Fragment>
  );

  const userBlockElement = (
    <React.Fragment>
      <div className="user-block">

        {isAuth &&
          <div className="user-block__avatar">
            <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
          </div>
        }

        {!isAuth &&
          <a
            href="sign-in.html"
            className="user-block__link"
            onClick={(evt) => {
              evt.preventDefault();
              onSignInClick();
            }}>
              Sign in
          </a>
        }

      </div>
    </React.Fragment>
  );

  return (
    <header className={`page-header ${isSignInPage ? `user-page__head` : `movie-card__head`}`}>
      <div className="logo">
        <a href={!isMainPage ? `main.html` : ``} className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </a>
      </div>

      {isSignInPage ? signInPageTitle : userBlockElement}

    </header>
  );
};

PageHeader.propTypes = {
  isMainPage: PropTypes.bool.isRequired,
  isSignInPage: PropTypes.bool.isRequired,
  isAuth: PropTypes.bool.isRequired,
  onSignInClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isMainPage: getCurrentPage(state) === Pages.MAIN,
  isSignInPage: getCurrentPage(state) === Pages.SIGN_IN,
  isAuth: getAuthorizationStatus(state) === AuthorizationStatus.AUTH,
});

const mapDispatchToProps = (dispatch) => ({
  onSignInClick() {
    dispatch(ActionCreator.goToSignInPage());
  },
});

export {PageHeader};
export default connect(mapStateToProps, mapDispatchToProps)(PageHeader);
