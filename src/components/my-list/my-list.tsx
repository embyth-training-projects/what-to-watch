import * as React from "react";
import {connect} from "react-redux";

import {getFavoriteMovies} from "../../store/data/selectors";
import {Operations as DataOperations} from "../../store/data/data";

import MoviesList from "../movies-list/movies-list";
import PageHeader from "../page-header/page-header";
import PageFooter from "../page-footer/page-footer";

import {MovieInterface} from "../../helpers/types";
import {Pages} from "../../helpers/const";

interface MyListProps {
  movies: Array<MovieInterface>;
  loadFavoriteMovies(): void;
}

class MyList extends React.PureComponent<MyListProps, {}> {
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

          <MoviesList movies={movies} />
        </section>

        <PageFooter />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  movies: getFavoriteMovies(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadFavoriteMovies() {
    dispatch(DataOperations.loadFavoriteMovies());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MyList);
