import React from "react";
import PropTypes from "prop-types";

import MainPage from "../main-page/main-page";

const App = (props) => {
  const {movieCard} = props;

  return (
    <MainPage movieCard={movieCard} />
  );
};

App.propTypes = {
  movieCard: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    releaseDate: PropTypes.number.isRequired,
  }).isRequired,
};

export default App;
