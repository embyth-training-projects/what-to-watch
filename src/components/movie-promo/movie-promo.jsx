import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import PageHeader from "../page-header/page-header";
import MyListButton from "../my-list-button/my-list-button";

import {getMoviePromo} from "../../store/data/selectors";

import {CustomPropTypes} from "../../helpers/custom-prop-types";
import {AppRoute, Pages} from "../../helpers/const";

const MoviePromo = ({moviePromo}) => (
  <section className="movie-card">
    <div className="movie-card__bg">
      <img src={moviePromo.background} alt={moviePromo.title} />
    </div>

    <h1 className="visually-hidden">WTW</h1>

    <PageHeader currentPage={Pages.MAIN} />

    <div className="movie-card__wrap">
      <div className="movie-card__info">
        <div className="movie-card__poster">
          <img src={moviePromo.poster} alt={`${moviePromo.title} poster`} width="218" height="327" />
        </div>

        <div className="movie-card__desc">
          <h2 className="movie-card__title">{moviePromo.title}</h2>
          <p className="movie-card__meta">
            <span className="movie-card__genre">{moviePromo.genre}</span>
            <span className="movie-card__year">{moviePromo.date}</span>
          </p>

          <div className="movie-card__buttons">
            <Link to={`${AppRoute.PLAYER}/${moviePromo.id}`} className="btn btn--play movie-card__button">
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#play-s"></use>
              </svg>
              <span>Play</span>
            </Link>
            <MyListButton movie={moviePromo} />
          </div>
        </div>
      </div>
    </div>
  </section>
);

MoviePromo.propTypes = {
  moviePromo: CustomPropTypes.MOVIE,
};

const mapStateToProps = (state) => ({
  moviePromo: getMoviePromo(state),
});

export {MoviePromo};
export default connect(mapStateToProps)(MoviePromo);
