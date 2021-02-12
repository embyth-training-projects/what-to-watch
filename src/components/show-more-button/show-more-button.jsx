import React from 'react';
import PropTypes from "prop-types";

const ShowMoreButton = ({onShowMoreButtonClick}) => (
  <div className="catalog__more">
    <button
      className="catalog__button"
      type="button"
      onClick={(evt) => {
        evt.preventDefault();
        onShowMoreButtonClick();
      }}
    >
      Show more
    </button>
  </div>
);

ShowMoreButton.propTypes = {
  onShowMoreButtonClick: PropTypes.func.isRequired,
};

export default ShowMoreButton;
