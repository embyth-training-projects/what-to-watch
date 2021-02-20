import * as React from "react";

interface MovieNavProps {
  navTabs: {
    OVERVIEW: string;
    DETAILS: string;
    REVIEWS: string;
  };
  currentActiveItem: string;
  onItemClick(tab: string): void;
}

const MovieNav: React.FC<MovieNavProps> = ({
  navTabs, currentActiveItem, onItemClick
}: MovieNavProps) => (
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

export default MovieNav;
