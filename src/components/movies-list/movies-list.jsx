import React from "react";
import PropTypes from "prop-types";

import MovieCard from "../movie-card/movie-card";

const MoviesList = ({movies, onTitleClick}) => {
  const handleCardMouseOver = () => {};

  return (
    <div className="catalog__movies-list">
      {movies.map((movie, index) => (
        <MovieCard
          key={movie.title + index}
          movie={movie}
          onTitleClick={onTitleClick}
          onCardMouseOver={handleCardMouseOver}
        />
      ))}
    </div>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  })).isRequired,
  onTitleClick: PropTypes.func.isRequired,
};

export default MoviesList;
