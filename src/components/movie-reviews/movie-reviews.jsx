import React from "react";
import PropTypes from "prop-types";

import CustomPropTypes from "../../utils/custom-prop-types";

const getMachineReadableDate = (date) => {
  return new Date(date).toISOString().slice(0, 10);
};

const MovieReviews = ({reviews}) => (
  <div className="movie-card__reviews movie-card__row">
    <div className="movie-card__reviews-col">

      {reviews[0].reviews.map((review) => (
        <div key={review.id} className="review">
          <blockquote className="review__quote">
            <p className="review__text">{review.content}</p>

            <footer className="review__details">
              <cite className="review__author">{review.author}</cite>
              <time className="review__date" dateTime={getMachineReadableDate(review.date)}>{review.date}</time>
            </footer>
          </blockquote>

          <div className="review__rating">{review.rating}</div>
        </div>
      ))}

    </div>
  </div>
);

MovieReviews.propTypes = {
  reviews: PropTypes.arrayOf(CustomPropTypes.REVIEW).isRequired,
};

export default MovieReviews;
