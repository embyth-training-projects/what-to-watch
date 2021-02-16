import React from "react";

import {CustomPropTypes} from "../../helpers/custom-prop-types";
import {getReviewFormatDate, getFormatRating, convertDateToISO} from "../../helpers/utils";

const ReviewItem = ({review}) => (
  <div className="review">
    <blockquote className="review__quote">
      <p className="review__text">{review.comment}</p>

      <footer className="review__details">
        <cite className="review__author">{review.user.name}</cite>
        <time className="review__date" dateTime={convertDateToISO(review.date)}>{getReviewFormatDate(review.date)}</time>
      </footer>
    </blockquote>

    <div className="review__rating">{getFormatRating(review.rating)}</div>
  </div>
);

ReviewItem.propTypes = {
  review: CustomPropTypes.REVIEW,
};

export default ReviewItem;
