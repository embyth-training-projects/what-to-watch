import * as React from "react";
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

import {MovieInterface} from "../../helpers/types";
import {NavTabs, Pages} from "../../helpers/const";

const MoviePageInfoWrapped = withActiveItem(MoviePageInfo);
const MoviesListWrapped = withShowMore(MoviesList);

interface MoviePageProps {
  currentMovie: MovieInterface;
  loadMovieInfo(movie: MovieInterface): void;
}

class MoviePage extends React.PureComponent<MoviePageProps, {}> {
  componentDidMount() {
    const {currentMovie, loadMovieInfo} = this.props;
    loadMovieInfo(currentMovie);
  }

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
            <MoviesListWrapped currentMovie={Pages.MOVIE} />
          </section>
          <PageFooter />
        </div>

      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentMovie: getCurrentMovieById(state, ownProps),
});

const mapDispatchToProps = (dispatch) => ({
  loadMovieInfo(movie) {
    dispatch(ActionCreator.setCurrentMovie(movie));
    dispatch(ActionCreator.setCurrentGenre(movie.genre));
    dispatch(DataOperations.loadMovieReviews(movie.id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
