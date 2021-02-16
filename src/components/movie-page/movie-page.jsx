import React from "react";
import {connect} from "react-redux";

import MoviePageHero from "../movie-page-hero/movie-page-hero";
import MoviePageInfo from "../movie-page-info/movie-page-info";
import MoviesList from "../movies-list/movies-list";
import PageFooter from "../page-footer/page-footer";

import withActiveItem from "../../hocs/with-active-item/with-active-item";
import withShowMore from "../../hocs/with-show-more/with-show-more";

import {getCurrentMovie} from "../../store/app/selectors";

import {CustomPropTypes} from "../../helpers/custom-prop-types";
import {NavTabs} from "../../helpers/const";

const MoviePageInfoWrapped = withActiveItem(MoviePageInfo);
const MoviesListWrapped = withShowMore(MoviesList);

const MoviePage = ({currentMovie}) => (
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

MoviePage.propTypes = {
  currentMovie: CustomPropTypes.MOVIE,
};

const mapStateToProps = (state) => ({
  currentMovie: getCurrentMovie(state),
});

export default connect(mapStateToProps)(MoviePage);
