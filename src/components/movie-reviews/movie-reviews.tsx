import * as React from "react";
import {connect} from "react-redux";

import ReviewItem from "../review-item/review-item";

import {getMovieReviews} from "../../store/data/selectors";

import {ReviewInterface} from "../../helpers/types";
import {getLeftColumnReviews, getRightColumnReviews} from "../../helpers/utils";

interface MovieReviewsProps {
  movieReviews: Array<ReviewInterface>;
}

const MovieReviews: React.FC<MovieReviewsProps> = ({movieReviews}: MovieReviewsProps) => (
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

const mapStateToProps = (state) => ({
  movieReviews: getMovieReviews(state),
});

export {MovieReviews};
export default connect(mapStateToProps)(MovieReviews);
