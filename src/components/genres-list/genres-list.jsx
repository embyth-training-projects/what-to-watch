import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/reducer";

import {MAX_SHOWN_GENRES} from "../../helpers/const";
import {getMoviesGenres} from "../../helpers/utils";

const GenresList = ({genres, currentGenre, onGenreClick}) => (
  <ul className="catalog__genres-list">
    {genres.map((genre, index) => (
      <li key={`${genre}-${index}`} className={`catalog__genres-item ${genre === currentGenre ? `catalog__genres-item--active` : ``}`}>
        <a
          href="#"
          className="catalog__genres-link"
          onClick={(evt) => {
            evt.preventDefault();
            onGenreClick(genre);
          }}>
          {genre}
        </a>
      </li>
    ))}
  </ul>
);

GenresList.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  currentGenre: PropTypes.string.isRequired,
  onGenreClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  genres: getMoviesGenres(state.movies).slice(0, MAX_SHOWN_GENRES),
  currentGenre: state.currentGenre,
});

const mapDispatchToProps = (dispatch) => ({
  onGenreClick(genre) {
    dispatch(ActionCreator.setCurrentGenre(genre));
  }
});

export {GenresList};
export default connect(mapStateToProps, mapDispatchToProps)(GenresList);
