import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/reducer";

import {MAX_SHOWN_GENRES} from "../../helpers/const";

const GenresList = ({genres, currentGenre, onGenreClick}) => (
  <ul className="catalog__genres-list">
    {genres.slice(0, MAX_SHOWN_GENRES).map((genre, index) => (
      <li key={genre + index} className={`catalog__genres-item ${genre === currentGenre ? `catalog__genres-item--active` : ``}`}>
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
  genres: state.genres,
  currentGenre: state.currentGenre,
});

const mapDispatchToProps = (dispatch) => ({
  onGenreClick(genre) {
    dispatch(ActionCreator.getMoviesByGenre(genre));
    dispatch(ActionCreator.getcurrentGenre(genre));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(GenresList);
