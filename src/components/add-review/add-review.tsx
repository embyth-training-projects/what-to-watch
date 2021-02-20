import * as React from "react";
import {Link} from "react-router-dom";

import PageHeader from "../page-header/page-header";

import {MovieInterface} from "../../helpers/types";
import {AppRoute, Pages, Review} from "../../helpers/const";

interface AddReviewProps {
  currentMovie: MovieInterface;
  onFormSubmit(): void;
  onFormChange(): void;
  onReviewChange(): void;
  onRatingChange(): void;
  isSubmitDisabled: boolean;
  isReviewSending: boolean;
  isSendingError: boolean;
}

const AddReview: React.FC<AddReviewProps> = ({
  currentMovie, onFormSubmit, onFormChange, onReviewChange, onRatingChange, isSubmitDisabled, isReviewSending, isSendingError
}: AddReviewProps) => (
  <section className="movie-card movie-card--full">
    <div className="movie-card__header">
      <div className="movie-card__bg" style={{backgroundColor: currentMovie.backgroundColor}}>
        <img src={currentMovie.background} alt={currentMovie.title} />
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <PageHeader currentPage={Pages.ADD_REVIEW}>
        <nav className="breadcrumbs">
          <ul className="breadcrumbs__list">
            <li className="breadcrumbs__item">
              <Link to={`${AppRoute.MOVIE}/${currentMovie.id}`} className="breadcrumbs__link">{currentMovie.title}</Link>
            </li>
            <li className="breadcrumbs__item">
              <a className="breadcrumbs__link">Add review</a>
            </li>
          </ul>
        </nav>
      </PageHeader>

      <div className="movie-card__poster movie-card__poster--small">
        <img src={currentMovie.poster} alt={`${currentMovie.title} poster`} width="218" height="327" />
      </div>
    </div>

    <div className="add-review">
      <form action="#" className="add-review__form" onSubmit={onFormSubmit} onChange={onFormChange}>
        <div className="rating">
          <div className="rating__stars">
            {Review.RATINGS.map((rating) => (
              <React.Fragment key={rating}>
                <input className="rating__input" id={`star-${rating}`} type="radio" name="rating" value={rating} disabled={isReviewSending} onChange={onRatingChange} />
                <label className="rating__label" htmlFor={`star-${rating}`}>Rating {rating}</label>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="add-review__text">
          <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" disabled={isReviewSending} onChange={onReviewChange} required></textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit" disabled={isSubmitDisabled}>
              {isReviewSending ? Review.BUTTON_LABEL.SENDING : Review.BUTTON_LABEL.POST}
            </button>
          </div>
        </div>
      </form>
      {isSendingError &&
        <p style={{color: `red`}}>Error while sending data. Please, try again later.</p>
      }
    </div>

  </section>
);

export default AddReview;
