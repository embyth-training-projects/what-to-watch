import React from "react";
import PropTypes from "prop-types";

import MoviePromo from "../movie-promo/movie-promo";
import Catalog from "../catalog/catalog";
import PageFooter from "../page-footer/page-footer";

const MainPage = ({isMainPage, onMovieCardClick}) => (
  <React.Fragment>

    <MoviePromo isMainPage={isMainPage} />

    <div className="page-content">
      <Catalog onMovieCardClick={onMovieCardClick} />
      <PageFooter isMainPage={isMainPage} />
    </div>

  </React.Fragment>
);

MainPage.propTypes = {
  onMovieCardClick: PropTypes.func.isRequired,
  isMainPage: PropTypes.bool.isRequired,
};

export default MainPage;
