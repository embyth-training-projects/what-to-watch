import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import PageHeader from "../page-header/page-header";

import {ActionCreator} from "../../store/app/app";
import {getAuthorizationStatus} from "../../store/user/selectors";

import {CustomPropTypes} from "../../helpers/custom-prop-types";
import {AuthorizationStatus} from "../../helpers/const";

const MoviePageHero = ({currentMovie, isSignIn, onPlayButtonClick, onAddReviewClick}) => (
  <div className="movie-card__hero">
    <div className="movie-card__bg">
      <img src={currentMovie.background} alt={currentMovie.title} />
    </div>

    <h1 className="visually-hidden">WTW</h1>

    <PageHeader />

    <div className="movie-card__wrap">
      <div className="movie-card__desc">
        <h2 className="movie-card__title">{currentMovie.title}</h2>
        <p className="movie-card__meta">
          <span className="movie-card__genre">{currentMovie.genre}</span>
          <span className="movie-card__year">{currentMovie.date}</span>
        </p>

        <div className="movie-card__buttons">
          <button className="btn btn--play movie-card__button" type="button" onClick={onPlayButtonClick}>
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref="#play-s"></use>
            </svg>
            <span>Play</span>
          </button>
          <button className="btn btn--list movie-card__button" type="button">
            <svg viewBox="0 0 19 20" width="19" height="20">
              <use xlinkHref="#add"></use>
            </svg>
            <span>My list</span>
          </button>
          {isSignIn &&
            <a href="add-review.html" className="btn movie-card__button" onClick={onAddReviewClick}>Add review</a>
          }
        </div>
      </div>
    </div>
  </div>
);

MoviePageHero.propTypes = {
  currentMovie: CustomPropTypes.MOVIE,
  isSignIn: PropTypes.bool.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  onAddReviewClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isSignIn: getAuthorizationStatus(state) === AuthorizationStatus.AUTH,
});

const mapDispatchToProps = (dispatch) => ({
  onPlayButtonClick() {
    dispatch(ActionCreator.watchMovie());
  },

  onAddReviewClick(evt) {
    evt.preventDefault();
    dispatch(ActionCreator.addReview());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviePageHero);
