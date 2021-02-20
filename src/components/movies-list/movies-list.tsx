import * as React from "react";

import MovieCard from "../movie-card/movie-card";

import withActiveVideo from "../../hocs/with-active-video/with-active-video";

import {MovieInterface} from "../../helpers/types";

const MovieCardWrapped = withActiveVideo(MovieCard);

interface MoviesListProps {
  movies: Array<MovieInterface>;
  render?: () => JSX.Element;
}

const MoviesList: React.FC<MoviesListProps> = ({
  movies, render
}: MoviesListProps) => (
  <React.Fragment>
    <div className="catalog__movies-list">
      {movies.map((movie) => (
        <MovieCardWrapped
          key={movie.id}
          movie={movie}
        />
      ))}
    </div>
    {render && render()}
  </React.Fragment>
);

export default MoviesList;
