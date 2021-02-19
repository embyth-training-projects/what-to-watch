import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {getFavoriteMovies} from "../../store/data/selectors";
import {Operations as DataOperations} from "../../store/data/data";

import MoviesList from "../movies-list/movies-list";
import PageHeader from "../page-header/page-header";
import PageFooter from "../page-footer/page-footer";

import {CustomPropTypes} from "../../helpers/custom-prop-types";
import {Pages} from "../../helpers/const";

class MyList extends PureComponent {
  componentDidMount() {
    const {loadFavoriteMovies} = this.props;
    loadFavoriteMovies();
  }

  render() {
    const {movies} = this.props;

    return (
      <div className="user-page">
        <PageHeader currentPage={Pages.MY_LIST} />

        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <MoviesList movies={movies} render={() => {}} />
        </section>

        <PageFooter />
      </div>
    );
  }
}

MyList.propTypes = {
  movies: PropTypes.arrayOf(CustomPropTypes.MOVIE).isRequired,
  loadFavoriteMovies: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  movies: getFavoriteMovies(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadFavoriteMovies() {
    dispatch(DataOperations.loadFavoriteMovies());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MyList);
