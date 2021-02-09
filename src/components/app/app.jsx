import React from "react";
import PropTypes from "prop-types";

import MainPage from "../main-page/main-page";

const titleClickHandler = (evt) => {
  evt.preventDefault();
};

const App = (props) => {
  const {movieCards, promoMovie} = props;

  return (
    <MainPage
      promoMovie={promoMovie}
      movieCards={movieCards}
      onTitleClick={titleClickHandler}
    />
  );
};

App.propTypes = {
  movieCards: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  })).isRequired,
  promoMovie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
  }).isRequired,
};

export default App;
