import React from "react";
import PropTypes from "prop-types";

import {getReviewFormatDate, getFormatRating} from "../../helpers/utils";

const ReviewItem = ({review}) => (
  <div className="review">
    <blockquote className="review__quote">
      <p className="review__text">{review.content}</p>

      <footer className="review__details">
        <cite className="review__author">{review.author}</cite>
        <time className="review__date" dateTime={review.date}>{getReviewFormatDate(review.date)}</time>
      </footer>
    </blockquote>

    <div className="review__rating">{getFormatRating(review.rating)}</div>
  </div>
);

ReviewItem.propTypes = {
  review: PropTypes.shape({
    author: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }),
};

export default ReviewItem;
