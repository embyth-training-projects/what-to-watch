import * as React from "react";
import {connect} from "react-redux";
import history from "../../history";

import {Operations as DataOperations} from "../../store/data/data";
import {getAuthorizationStatus} from "../../store/user/selectors";

import {MovieInterface} from "../../helpers/types";
import {AppRoute, AuthorizationStatus} from "../../helpers/const";

interface MyListButtonProps {
  authorizationStatus: string;
  movie: MovieInterface;
  changeIsMovieFavorite(movieId: number, isFavorite: boolean): void;
}

const MyListButton: React.FC<MyListButtonProps> = ({
  authorizationStatus, movie, changeIsMovieFavorite
}: MyListButtonProps) => {
  const handleMyListButtonClick = () => authorizationStatus === AuthorizationStatus.AUTH
    ? changeIsMovieFavorite(movie.id, !movie.isFavorite)
    : history.push(AppRoute.SIGN_IN);

  return (
    <button
      className="btn btn--list movie-card__button"
      type="button"
      onClick={handleMyListButtonClick}
    >
      {movie.isFavorite
        ? <svg viewBox="0 0 18 14" width="18" height="14">
          <use xlinkHref="#in-list"></use>
        </svg>
        : <svg viewBox="0 0 19 20" width="19" height="20">
          <use xlinkHref="#add"></use>
        </svg>}

      <span>My list</span>
    </button>
  );
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  changeIsMovieFavorite(movieId, isFavorite) {
    dispatch(DataOperations.changeIsMovieFavorite(movieId, isFavorite));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MyListButton);
