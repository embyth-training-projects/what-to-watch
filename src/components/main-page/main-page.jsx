import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/reducer";

import MoviePromo from "../movie-promo/movie-promo";
import GenresList from "../genres-list/genres-list";
import MoviesList from "../movies-list/movies-list";
import ShowMoreButton from "../show-more-button/show-more-button";
import Footer from "../footer/footer";

import {CustomPropTypes} from "../../helpers/custom-prop-types";
import {getMoviesGenres} from "../../helpers/utils";
import {MOVIES_SHOWN} from "../../helpers/const";

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
        <MoviePromo currentMovie={currentMovie} />

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

            {moviesByGenre.length > moviesShown.length && <ShowMoreButton onShowMoreButtonClick={this._handleShowMoreButtonClick} />}

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
