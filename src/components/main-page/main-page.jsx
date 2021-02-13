import React from "react";

import MoviePromo from "../movie-promo/movie-promo";
import Catalog from "../catalog/catalog";
import PageFooter from "../page-footer/page-footer";

const MainPage = () => (
  <React.Fragment>

    <MoviePromo />

    <div className="page-content">
      <Catalog />
      <PageFooter />
    </div>

  </React.Fragment>
);

export default MainPage;
