import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import {getCurrentPage} from "../../store/app/selectors";
import {getAuthorizationStatus, getUserInfo} from "../../store/user/selectors";

import {CustomPropTypes} from "../../helpers/custom-prop-types";
import {Pages, AuthorizationStatus, AppRoute} from "../../helpers/const";

const PageHeader = ({isSignInPage, isAuth, isPageWithBreadcrumbs, userInfo}) => {
  const signInPageTitle = (
    <h1 className="page-title user-page__title">Sign in</h1>
  );

  const userBlockElement = (
    <div className="user-block">
      {isAuth &&
        <Link to={AppRoute.MY_LIST}>
          <div className="user-block__avatar">
            <img src={userInfo.avatarSrc} alt={userInfo.name} width="63" height="63" />
          </div>
        </Link>
      }

      {!isAuth &&
        <Link to={AppRoute.SIGN_IN} className="user-block__link">Sign in</Link>
      }
    </div>
  );

  const breadcrumbs = (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          {/* <Link to={`${AppRoute.MOVIE}/${currentMovie}`} className="breadcrumbs__link">{currentMovie}</Link> */}
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
        <Link to={AppRoute.ROOT} className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>

      {isPageWithBreadcrumbs && breadcrumbs}
      {isSignInPage ? signInPageTitle : userBlockElement}

    </header>
  );
};

PageHeader.propTypes = {
  isSignInPage: PropTypes.bool.isRequired,
  isPageWithBreadcrumbs: PropTypes.bool.isRequired,
  isAuth: PropTypes.bool.isRequired,
  userInfo: CustomPropTypes.USER,
};

const mapStateToProps = (state) => ({
  isSignInPage: getCurrentPage(state) === Pages.SIGN_IN,
  isPageWithBreadcrumbs: getCurrentPage(state) === Pages.ADD_REVIEW,
  isAuth: getAuthorizationStatus(state) === AuthorizationStatus.AUTH,
  userInfo: getUserInfo(state),
});

export {PageHeader};
export default connect(mapStateToProps)(PageHeader);
