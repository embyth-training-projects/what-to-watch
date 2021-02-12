import React from "react";
import PropTypes from "prop-types";

const MAX_SHOWN_GENRES = 10;

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

export default GenresList;
