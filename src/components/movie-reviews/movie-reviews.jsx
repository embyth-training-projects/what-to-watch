import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import ReviewItem from "../review-item/review-item";

import {getMovieReviews} from "../../store/data/selectors";

import {CustomPropTypes} from "../../helpers/custom-prop-types";
import {getLeftColumnReviews, getRightColumnReviews} from "../../helpers/utils";

const MovieReviews = ({movieReviews}) => (
  <div className="movie-card__reviews movie-card__row">
    <div className="movie-card__reviews-col">
      {getLeftColumnReviews(movieReviews).map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </div>

    <div className="movie-card__reviews-col">
      {getRightColumnReviews(movieReviews).map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </div>
  </div>
);

MovieReviews.propTypes = {
  movieReviews: PropTypes.arrayOf(CustomPropTypes.REVIEW).isRequired,
};

const mapStateToProps = (state) => ({
  movieReviews: getMovieReviews(state),
});

export {MovieReviews};
export default connect(mapStateToProps)(MovieReviews);
