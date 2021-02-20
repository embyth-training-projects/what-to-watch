import * as React from "react";

import MovieNav from "../movie-nav/movie-nav";
import MovieDetails from "../movie-details/movie-details";
import MovieOverview from "../movie-overview/movie-overview";
import MovieReviews from "../movie-reviews/movie-reviews";

import {MovieInterface} from "../../helpers/types";
import {NavTabs} from "../../helpers/const";

interface MoviePageInfoProps {
  currentMovie: MovieInterface;
  currentActiveItem: string;
  onItemClick(): void;
}

class MoviePageInfo extends React.PureComponent<MoviePageInfoProps, {}> {
  private _renderActiveTab() {
    const {currentMovie, currentActiveItem} = this.props;

    switch (currentActiveItem) {
      case NavTabs.OVERVIEW:
        return <MovieOverview
          movie={currentMovie}
        />;
      case NavTabs.DETAILS:
        return <MovieDetails
          movie={currentMovie}
        />;
      case NavTabs.REVIEWS:
        return <MovieReviews />;
      default:
        return <MovieOverview
          movie={currentMovie}
        />;
    }
  }

  render() {
    const {currentMovie, currentActiveItem, onItemClick} = this.props;

    return (
      <div className="movie-card__wrap movie-card__translate-top">
        <div className="movie-card__info">
          <div className="movie-card__poster movie-card__poster--big">
            <img src={currentMovie.poster} alt={currentMovie.title} width="218" height="327" />
          </div>

          <div className="movie-card__desc">
            <MovieNav
              navTabs={NavTabs}
              currentActiveItem={currentActiveItem}
              onItemClick={onItemClick}
            />

            {this._renderActiveTab()}
          </div>
        </div>
      </div>
    );
  }
}

export default MoviePageInfo;
