import * as React from "react";

import {ReviewInterface} from "../../helpers/types";
import {getReviewFormatDate, getFormatRating, convertDateToISO} from "../../helpers/utils";

interface ReviewItemProps {
  review: ReviewInterface;
}

const ReviewItem: React.FC<ReviewItemProps> = ({review}: ReviewItemProps) => (
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

export default ReviewItem;
