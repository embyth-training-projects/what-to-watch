import * as React from "react";
import {connect} from "react-redux";

import {getCurrentMovieById} from "../../store/app/selectors";
import {getReviewRequestStatus} from "../../store/data/selectors";
import {Operations as DataOperations, ActionCreator} from "../../store/data/data";

import {Review, RequestStatus} from "../../helpers/const";
import {MovieInterface} from "../../helpers/types";

interface WithReviewProps {
  currentMovie: MovieInterface;
  isReviewSending: boolean;
  isSendingError: boolean;
  onReviewSubmit(movieId: number, review: {
    rating: number;
    comment: string;
  }): void;
  clearSendingError(): void;
}

interface WithReviewState {
  rating: number;
  comment: string;
  isSubmitDisabled: boolean;
}

const withReview = (Component) => {
  class WithReview extends React.PureComponent<WithReviewProps, WithReviewState> {
    constructor(props) {
      super(props);

      this.state = {
        rating: 5,
        comment: ``,
        isSubmitDisabled: true,
      };

      this._handleFormSubmit = this._handleFormSubmit.bind(this);
      this._handleFormChange = this._handleFormChange.bind(this);
      this._handleReviewChange = this._handleReviewChange.bind(this);
      this._handleRatingChange = this._handleRatingChange.bind(this);
    }

    private _handleFormSubmit(evt) {
      const {currentMovie, onReviewSubmit} = this.props;

      const review = {
        rating: this.state.rating,
        comment: this.state.comment,
      };

      evt.preventDefault();
      onReviewSubmit(currentMovie.id, review);
    }

    private _handleFormChange() {
      this.props.clearSendingError();
    }

    private _handleReviewChange(evt) {
      const {isReviewSending} = this.props;
      const target = evt.target;

      this.setState({
        comment: target.value,
        isSubmitDisabled: target.value.length < Review.MIN_LENGTH || target.value.length > Review.MAX_LENGTH || isReviewSending,
      });
    }

    private _handleRatingChange(evt) {
      this.setState({
        rating: +evt.target.value,
      });
    }

    render() {
      const {currentMovie} = this.props;

      return (
        <Component
          {...this.props}
          currentMovie={currentMovie}
          onFormSubmit={this._handleFormSubmit}
          onFormChange={this._handleFormChange}
          onReviewChange={this._handleReviewChange}
          onRatingChange={this._handleRatingChange}
          isSubmitDisabled={this.state.isSubmitDisabled}
        />
      );
    }
  }

  const mapStateToProps = (state, ownProps) => ({
    currentMovie: getCurrentMovieById(state, ownProps),
    isReviewSending: getReviewRequestStatus(state) === RequestStatus.SENDING,
    isSendingError: getReviewRequestStatus(state) === RequestStatus.ERROR,
  });

  const mapDispatchToProps = (dispatch) => ({
    onReviewSubmit(movieId, reviewData) {
      dispatch(DataOperations.sendReview(movieId, reviewData));
    },

    clearSendingError() {
      dispatch(ActionCreator.setReviewRequestStatus(RequestStatus.NOT_SENT));
    },
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithReview);
};

export default withReview;
