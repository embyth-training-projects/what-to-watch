import React from "react";
import PropTypes from "prop-types";

import {getMachineReadableDate} from "../../helpers/utils";

const ReviewItem = ({review}) => (
  <div className="review">
    <blockquote className="review__quote">
      <p className="review__text">{review.content}</p>

      <footer className="review__details">
        <cite className="review__author">{review.author}</cite>
        <time className="review__date" dateTime={getMachineReadableDate(review.date)}>{review.date}</time>
      </footer>
    </blockquote>

    <div className="review__rating">{review.rating}</div>
  </div>
);

ReviewItem.propTypes = {
  review: PropTypes.shape({
    author: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }),
};

export default ReviewItem;
