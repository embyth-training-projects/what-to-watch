import * as React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import PageHeader from "../page-header/page-header";
import MyListButton from "../my-list-button/my-list-button";

import {getAuthorizationStatus} from "../../store/user/selectors";

import {MovieInterface} from "../../helpers/types";
import {AuthorizationStatus, AppRoute, Pages} from "../../helpers/const";

interface MoviePageHeroProps {
  currentMovie: MovieInterface;
  isSignIn: boolean;
}

const MoviePageHero: React.FC<MoviePageHeroProps> = ({
  currentMovie, isSignIn
}: MoviePageHeroProps) => (
  <div className="movie-card__hero">
    <div className="movie-card__bg">
      <img src={currentMovie.background} alt={currentMovie.title} />
    </div>

    <h1 className="visually-hidden">WTW</h1>

    <PageHeader currentPage={Pages.MOVIE} />

    <div className="movie-card__wrap">
      <div className="movie-card__desc">
        <h2 className="movie-card__title">{currentMovie.title}</h2>
        <p className="movie-card__meta">
          <span className="movie-card__genre">{currentMovie.genre}</span>
          <span className="movie-card__year">{currentMovie.date}</span>
        </p>

        <div className="movie-card__buttons">
          <Link to={`${AppRoute.PLAYER}/${currentMovie.id}`} className="btn btn--play movie-card__button">
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref="#play-s"></use>
            </svg>
            <span>Play</span>
          </Link>
          <MyListButton movie={currentMovie} />
          {isSignIn &&
            <Link to={`${AppRoute.MOVIE}/${currentMovie.id}${AppRoute.ADD_REVIEW}`} className="btn movie-card__button">Add review</Link>
          }
        </div>
      </div>
    </div>
  </div>
);

const mapStateToProps = (state) => ({
  isSignIn: getAuthorizationStatus(state) === AuthorizationStatus.AUTH,
});

export default connect(mapStateToProps)(MoviePageHero);
