import React from "react";

import ReviewItem from "../review-item/review-item";

import {CustomPropTypes} from "../../helpers/custom-prop-types";
import {getLeftColumnReviews, getRightColumnReviews} from "../../helpers/utils";

const MovieReviews = ({movieReviews}) => (
  <div className="movie-card__reviews movie-card__row">
    <div className="movie-card__reviews-col">
      {getLeftColumnReviews(movieReviews.reviews).map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </div>

    <div className="movie-card__reviews-col">
      {getRightColumnReviews(movieReviews.reviews).map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </div>
  </div>
);

MovieReviews.propTypes = {
  movieReviews: CustomPropTypes.REVIEW,
};

export default MovieReviews;
