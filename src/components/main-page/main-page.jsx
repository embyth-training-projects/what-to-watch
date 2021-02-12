import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import MoviesList from "../movies-list/movies-list";
import Footer from "../footer/footer";

import CustomPropTypes from "../../helpers/custom-prop-types";
import GenresList from "../genres-list/genres-list";

const getMoviesGenres = (movies) => {
  return [`All genres`].concat(...new Set(movies.map((movie) => movie.genre)));
};

export default class MainPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeGenre: `All genres`,
    };

    this._handleGenreClick = this._handleGenreClick.bind(this);
  }

  _handleGenreClick(genre) {
    this.setState({
      activeGenre: genre,
    });
  }

  render() {
    const {movieCards, onMovieCardClick, promoMovie} = this.props;
    const {title, genre, date} = promoMovie;
    const {activeGenre} = this.state;

    return (
      <React.Fragment>
        <section className="movie-card">
          <div className="movie-card__bg">
            <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header movie-card__head">
            <div className="logo">
              <a className="logo__link">
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
            <div className="movie-card__info">
              <div className="movie-card__poster">
                <img src="img/the-grand-budapest-hotel-poster.jpg" alt={`${title} poster`} width="218" height="327" />
              </div>

              <div className="movie-card__desc">
                <h2 className="movie-card__title">{title}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{genre}</span>
                  <span className="movie-card__year">{date}</span>
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
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="page-content">
          <section className="catalog">
            <h2 className="catalog__title visually-hidden">Catalog</h2>

            <GenresList genres={getMoviesGenres(movieCards)} currentGenre={activeGenre} onGenreClick={this._handleGenreClick} />

            <MoviesList movies={movieCards} onMovieCardClick={onMovieCardClick} />

            <div className="catalog__more">
              <button className="catalog__button" type="button">Show more</button>
            </div>
          </section>

          <Footer />

        </div>
      </React.Fragment>
    );
  }
}

MainPage.propTypes = {
  movieCards: PropTypes.arrayOf(CustomPropTypes.MOVIE).isRequired,
  promoMovie: CustomPropTypes.MOVIE,
  onMovieCardClick: PropTypes.func.isRequired,
};
