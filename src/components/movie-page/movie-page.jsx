import React from "react";
import {connect} from "react-redux";

import MoviePageHero from "../movie-page-hero/movie-page-hero";
import MoviePageInfo from "../movie-page-info/movie-page-info";
import MoviesList from "../movies-list/movies-list";
import PageFooter from "../page-footer/page-footer";

import {CustomPropTypes} from "../../helpers/custom-prop-types";

const MoviePage = ({currentMovie}) => (
  <React.Fragment>

    <section className="movie-card movie-card--full">
      <MoviePageHero currentMovie={currentMovie} />
      <MoviePageInfo currentMovie={currentMovie} />
    </section>

    <div className="page-content">
      <section className="catalog catalog--like-this">
        <h2 className="catalog__title">More like this</h2>
        <MoviesList />
      </section>
      <PageFooter />
    </div>

  </React.Fragment>
);

MoviePage.propTypes = {
  currentMovie: CustomPropTypes.MOVIE,
};

const mapStateToProps = (state) => ({
  currentMovie: state.currentMovie,
});

export default connect(mapStateToProps)(MoviePage);
