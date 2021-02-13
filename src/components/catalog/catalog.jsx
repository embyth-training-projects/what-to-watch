import React from "react";

import GenresList from "../genres-list/genres-list";
import MoviesList from "../movies-list/movies-list";

const Catalog = () => (
  <section className="catalog">
    <h2 className="catalog__title visually-hidden">Catalog</h2>

    <GenresList />
    <MoviesList />

  </section>
);

export default Catalog;
