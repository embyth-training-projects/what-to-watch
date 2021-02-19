import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import MoviePageHero from "../movie-page-hero/movie-page-hero";
import MoviePageInfo from "../movie-page-info/movie-page-info";
import MoviesList from "../movies-list/movies-list";
import PageFooter from "../page-footer/page-footer";

import withActiveItem from "../../hocs/with-active-item/with-active-item";
import withShowMore from "../../hocs/with-show-more/with-show-more";

import {ActionCreator} from "../../store/app/app";
import {getCurrentMovieById} from "../../store/app/selectors";
import {Operations as DataOperations} from "../../store/data/data";

import {CustomPropTypes} from "../../helpers/custom-prop-types";
import {emptyMovie, NavTabs} from "../../helpers/const";
import {getIsLoading} from "../../store/data/selectors";

const MoviePageInfoWrapped = withActiveItem(MoviePageInfo);
const MoviesListWrapped = withShowMore(MoviesList);

class MoviePage extends PureComponent {
  componentDidUpdate() {
    const {currentMovie, loadMovieInfo} = this.props;
    loadMovieInfo(currentMovie);
  }

  render() {
    const {currentMovie} = this.props;

    return (
      <React.Fragment>

        <section className="movie-card movie-card--full" style={{backgroundColor: currentMovie.backgroundColor}}>
          <MoviePageHero currentMovie={currentMovie} />
          <MoviePageInfoWrapped currentMovie={currentMovie} defaultActiveItem={NavTabs.OVERVIEW} />
        </section>

        <div className="page-content">
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>
            <MoviesListWrapped />
          </section>
          <PageFooter />
        </div>

      </React.Fragment>
    );
  }
}

MoviePage.propTypes = {
  currentMovie: CustomPropTypes.MOVIE,
  loadMovieInfo: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  currentMovie: getIsLoading(state) ? emptyMovie : getCurrentMovieById(state, ownProps),
});

const mapDispatchToProps = (dispatch) => ({
  loadMovieInfo(movie) {
    dispatch(ActionCreator.setCurrentMovie(movie));
    dispatch(ActionCreator.setCurrentGenre(movie.genre));
    dispatch(DataOperations.loadMovieReviews(movie.id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
