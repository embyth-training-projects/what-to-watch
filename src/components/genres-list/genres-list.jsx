import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {ActionCreator} from "../../store/app/app";
import {getMoviesGenres} from "../../store/data/selectors";
import {getCurrentGenre} from "../../store/app/selectors";

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
  genres: getMoviesGenres(state),
  currentGenre: getCurrentGenre(state),
});

const mapDispatchToProps = (dispatch) => ({
  onGenreClick(genre) {
    dispatch(ActionCreator.setCurrentGenre(genre));
  }
});

export {GenresList};
export default connect(mapStateToProps, mapDispatchToProps)(GenresList);
