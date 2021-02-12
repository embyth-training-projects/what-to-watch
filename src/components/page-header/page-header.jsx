import React from "react";
import PropTypes from "prop-types";

const PageHeader = ({isMainPage}) => (
  <header className="page-header movie-card__head">
    <div className="logo">
      <a href={!isMainPage ? `main.html` : ``} className="logo__link">
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </a>
    </div>

    <div className="user-block">
      <div className="user-block__avatar">
        <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
      </div>
    </div>
  </header>
);

PageHeader.propTypes = {
  isMainPage: PropTypes.bool.isRequired,
};

export default PageHeader;
