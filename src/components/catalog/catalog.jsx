import React from "react";

import GenresList from "../genres-list/genres-list";
import MoviesList from "../movies-list/movies-list";

import withShowMore from "../../hocs/with-show-more/with-show-more";

const MoviesListWrapped = withShowMore(MoviesList);

const Catalog = () => (
  <section className="catalog">
    <h2 className="catalog__title visually-hidden">Catalog</h2>

    <GenresList />
    <MoviesListWrapped />

  </section>
);

export default Catalog;
