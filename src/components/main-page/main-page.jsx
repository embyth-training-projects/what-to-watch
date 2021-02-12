import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/reducer";

import GenresList from "../genres-list/genres-list";
import MoviesList from "../movies-list/movies-list";
import ShowMoreButton from "../show-more-button/show-more-button";
import Footer from "../footer/footer";

import {CustomPropTypes} from "../../helpers/custom-prop-types";
import {getMoviesGenres} from "../../helpers/utils";

const MOVIES_SHOWN = 8;

class MainPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      moviesShown: props.moviesByGenre.slice(0, MOVIES_SHOWN),
    };

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
  }

  _handleShowMoreButtonClick() {
    this.setState((prevState) => ({
      moviesShown: [
        ...prevState.moviesShown,
        ...this.props.moviesByGenre.slice(
            prevState.moviesShown.length,
            prevState.moviesShown.length + MOVIES_SHOWN
        ),
      ]
    }));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeGenre !== this.props.activeGenre) {
      this.setState({
        moviesShown: this.props.moviesByGenre.slice(0, MOVIES_SHOWN),
      });
    }
  }

  render() {
    const {currentMovie, movies, activeGenre, moviesByGenre, onMovieCardClick, onGenreClick} = this.props;
    const {moviesShown} = this.state;

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
                <img src="img/the-grand-budapest-hotel-poster.jpg" alt={`${currentMovie.title} poster`} width="218" height="327" />
              </div>

              <div className="movie-card__desc">
                <h2 className="movie-card__title">{currentMovie.title}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{currentMovie.genre}</span>
                  <span className="movie-card__year">{currentMovie.date}</span>
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

            <GenresList
              genres={getMoviesGenres(movies)}
              currentGenre={activeGenre}
              onGenreClick={onGenreClick}
            />

            <MoviesList
              movies={moviesShown}
              onMovieCardClick={onMovieCardClick}
            />

            {moviesByGenre.length > moviesShown.length
              ? <ShowMoreButton
                onShowMoreButtonClick={this._handleShowMoreButtonClick}
              />
              : null
            }

          </section>

          <Footer />

        </div>
      </React.Fragment>
    );
  }

}

MainPage.propTypes = {
  currentMovie: CustomPropTypes.MOVIE,
  movies: PropTypes.arrayOf(CustomPropTypes.MOVIE).isRequired,
  activeGenre: PropTypes.string.isRequired,
  moviesByGenre: PropTypes.arrayOf(CustomPropTypes.MOVIE).isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
  onGenreClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentMovie: state.currentMovie,
  movies: state.movies,
  activeGenre: state.activeGenre,
  moviesByGenre: state.moviesByGenre,
});

const mapDispatchToProps = (dispatch) => ({
  onGenreClick(genre) {
    dispatch(ActionCreator.getMoviesByGenre(genre));
    dispatch(ActionCreator.getActiveGenre(genre));
  },
});

export {MainPage};
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
