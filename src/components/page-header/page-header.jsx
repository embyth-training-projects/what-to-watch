import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {getCurrentMovie, getCurrentPage} from "../../store/app/selectors";
import {ActionCreator} from "../../store/app/app";
import {getAuthorizationStatus, getUserInfo} from "../../store/user/selectors";

import {CustomPropTypes} from "../../helpers/custom-prop-types";
import {Pages, AuthorizationStatus} from "../../helpers/const";

const PageHeader = ({isMainPage, isSignInPage, isAuth, isPageWithBreadcrumbs, userInfo, currentMovie, onSignInClick}) => {
  const signInPageTitle = (
    <h1 className="page-title user-page__title">Sign in</h1>
  );

  const userBlockElement = (
    <div className="user-block">
      {isAuth &&
        <div className="user-block__avatar">
          <img src={userInfo.avatarSrc} alt={userInfo.name} width="63" height="63" />
        </div>
      }

      {!isAuth &&
        <a href="sign-in.html" className="user-block__link" onClick={onSignInClick}>Sign in</a>
      }
    </div>
  );

  const breadcrumbs = (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <a href="movie-page.html" className="breadcrumbs__link">{currentMovie.title}</a>
        </li>
        <li className="breadcrumbs__item">
          <a className="breadcrumbs__link">Add review</a>
        </li>
      </ul>
    </nav>
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

      {isPageWithBreadcrumbs && breadcrumbs}
      {isSignInPage ? signInPageTitle : userBlockElement}

    </header>
  );
};

PageHeader.propTypes = {
  isMainPage: PropTypes.bool.isRequired,
  isSignInPage: PropTypes.bool.isRequired,
  isPageWithBreadcrumbs: PropTypes.bool.isRequired,
  isAuth: PropTypes.bool.isRequired,
  onSignInClick: PropTypes.func.isRequired,
  userInfo: CustomPropTypes.USER,
  currentMovie: CustomPropTypes.MOVIE,
};

const mapStateToProps = (state) => ({
  isMainPage: getCurrentPage(state) === Pages.MAIN,
  isSignInPage: getCurrentPage(state) === Pages.SIGN_IN,
  isPageWithBreadcrumbs: getCurrentPage(state) === Pages.ADD_REVIEW,
  isAuth: getAuthorizationStatus(state) === AuthorizationStatus.AUTH,
  userInfo: getUserInfo(state),
  currentMovie: getCurrentMovie(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSignInClick(evt) {
    evt.preventDefault();
    dispatch(ActionCreator.goToSignInPage());
  },
});

export {PageHeader};
export default connect(mapStateToProps, mapDispatchToProps)(PageHeader);
