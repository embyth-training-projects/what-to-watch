import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {getMovies} from "../../store/data/selectors";

import MoviesList from "../movies-list/movies-list";
import PageHeader from "../page-header/page-header";
import PageFooter from "../page-footer/page-footer";

import {CustomPropTypes} from "../../helpers/custom-prop-types";

const MyList = ({movies}) => (
  <div className="user-page">
    <PageHeader />

    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      <MoviesList movies={movies} render={() => {}} />
    </section>

    <PageFooter />
  </div>
);

MyList.propTypes = {
  movies: PropTypes.arrayOf(CustomPropTypes.MOVIE).isRequired,
};

const mapStateToProps = (state) => ({
  movies: getMovies(state),
});

export default connect(mapStateToProps)(MyList);
