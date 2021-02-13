import React from "react";
import PropTypes from "prop-types";

const MovieNav = ({navTabs, currentActiveItem, onItemClick}) => (
  <nav className="movie-nav movie-card__nav">
    <ul className="movie-nav__list">
      {Object.values(navTabs).map((tab) => (
        <li key={tab} className={`movie-nav__item ${tab === currentActiveItem ? `movie-nav__item--active` : ``}`}>
          <a
            href="#"
            className="movie-nav__link"
            onClick={(evt) => {
              evt.preventDefault();
              onItemClick(tab);
            }}
          >
            {tab}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);

MovieNav.propTypes = {
  navTabs: PropTypes.shape({
    OVERVIEW: PropTypes.string.isRequired,
    DETAILS: PropTypes.string.isRequired,
    REVIEWS: PropTypes.string.isRequired,
  }).isRequired,
  currentActiveItem: PropTypes.string.isRequired,
  onItemClick: PropTypes.func.isRequired,
};

export default MovieNav;
