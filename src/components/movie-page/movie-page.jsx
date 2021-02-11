import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import MovieNav from "../movie-nav/movie-nav";
import MovieDetails from "../movie-details/movie-details";
import MovieOverview from "../movie-overview/movie-overview";
import MovieReviews from "../movie-reviews/movie-reviews";
import MoviesLikeThis from "../movies-like-this/movies-like-this";
import Footer from "../footer/footer";

import CustomPropTypes from "../../utils/custom-prop-types";
import {NavTabs} from "../../utils/const";

export default class MoviePage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: NavTabs.OVERVIEW,
    };

    this._handleTabClick = this._handleTabClick.bind(this);
  }

  _handleTabClick(activeTab) {
    this.setState({currentTab: activeTab});
  }

  _renderActiveTab() {
    const {movie, reviews} = this.props;
    const {currentTab} = this.state;

    switch (currentTab) {
      case NavTabs.OVERVIEW:
        return <MovieOverview
          movie={movie}
        />;
      case NavTabs.DETAILS:
        return <MovieDetails
          movie={movie}
        />;
      case NavTabs.REVIEWS:
        return <MovieReviews
          movieReviews={reviews}
        />;
      default:
        return <MovieOverview
          movie={movie}
        />;
    }
  }

  render() {
    const {movie, movies, onMovieCardClick} = this.props;

    return (
      <React.Fragment>
        <section className="movie-card movie-card--full">
          <div className="movie-card__hero">
            <div className="movie-card__bg">
              <img src={movie.background} alt={movie.title} />
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <header className="page-header movie-card__head">
              <div className="logo">
                <a href="main.html" className="logo__link">
                  <span className="logo__letter logo__letter--1">W</span>
                  <span className="logo__letter logo__letter--2">T</span>
                  <span className="logo__letter logo__letter--3">W</span>
                </a>
              </div>

              <div className="user-block">
                <div className="user-block__avatar">
                  <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
                </div>
              </div>
            </header>

            <div className="movie-card__wrap">
              <div className="movie-card__desc">
                <h2 className="movie-card__title">{movie.title}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{movie.genre}</span>
                  <span className="movie-card__year">{movie.date}</span>
                </p>

                <div className="movie-card__buttons">
                  <button className="btn btn--play movie-card__button" type="button">
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
                  <a href="add-review.html" className="btn movie-card__button">Add review</a>
                </div>
              </div>
            </div>
          </div>

          <div className="movie-card__wrap movie-card__translate-top">
            <div className="movie-card__info">
              <div className="movie-card__poster movie-card__poster--big">
                <img src={movie.poster} alt={movie.title} width="218" height="327" />
              </div>

              <div className="movie-card__desc">
                <MovieNav
                  navTabs={NavTabs}
                  currentActiveTab={this.state.currentTab}
                  onTabClick={this._handleTabClick}
                />

                {this._renderActiveTab()}
              </div>
            </div>
          </div>
        </section>

        <div className="page-content">
          <MoviesLikeThis
            movies={movies}
            currentMovie={movie}
            onMovieCardClick={onMovieCardClick}
          />
          <Footer />
        </div>

      </React.Fragment>
    );
  }
}

MoviePage.propTypes = {
  movies: PropTypes.arrayOf(CustomPropTypes.MOVIE).isRequired,
  movie: CustomPropTypes.MOVIE,
  onMovieCardClick: PropTypes.func.isRequired,
  reviews: CustomPropTypes.REVIEW,
};
