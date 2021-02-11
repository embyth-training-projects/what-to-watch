import React from "react";
import PropTypes from "prop-types";

const MovieNav = ({navTabs, currentActiveTab, onTabClick}) => (
  <nav className="movie-nav movie-card__nav">
    <ul className="movie-nav__list">
      {Object.values(navTabs).map((tab) => (
        <li key={tab} className={`movie-nav__item ${tab === currentActiveTab ? `movie-nav__item--active` : ``}`}>
          <a
            href="#"
            className="movie-nav__link"
            onClick={(evt) => {
              evt.preventDefault();
              onTabClick(tab);
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
  currentActiveTab: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired,
};

export default MovieNav;
