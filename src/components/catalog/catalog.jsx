import React from "react";
import PropTypes from "prop-types";

import GenresList from "../genres-list/genres-list";
import MoviesList from "../movies-list/movies-list";

const Catalog = ({onMovieCardClick}) => (
  <section className="catalog">
    <h2 className="catalog__title visually-hidden">Catalog</h2>

    <GenresList />

    <MoviesList
      onMovieCardClick={onMovieCardClick}
    />

  </section>
);

Catalog.propTypes = {
  onMovieCardClick: PropTypes.func.isRequired,
};

export default Catalog;
