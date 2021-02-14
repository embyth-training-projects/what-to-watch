import React from "react";
import {connect} from "react-redux";

import ReviewItem from "../review-item/review-item";

import {CustomPropTypes} from "../../helpers/custom-prop-types";
import {getLeftColumnReviews, getRightColumnReviews, getMovieReviews} from "../../helpers/utils";

const MovieReviews = ({moviesReviews}) => (
  <div className="movie-card__reviews movie-card__row">
    <div className="movie-card__reviews-col">
      {getLeftColumnReviews(moviesReviews.reviews).map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </div>

    <div className="movie-card__reviews-col">
      {getRightColumnReviews(moviesReviews.reviews).map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </div>
  </div>
);

MovieReviews.propTypes = {
  moviesReviews: CustomPropTypes.REVIEW,
};

const mapStateToProps = (state) => ({
  moviesReviews: getMovieReviews(state.moviesReviews, state.currentMovie),
});

export {MovieReviews};
export default connect(mapStateToProps)(MovieReviews);
