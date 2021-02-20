import * as React from "react";
import {Link} from "react-router-dom";

import VideoPlayer from "../video-player/video-player";

import {MovieInterface} from "../../helpers/types";
import {AppRoute} from "../../helpers/const";

interface MovieCardProps {
  movie: MovieInterface;
  isPlaying: boolean;
  onMovieCardMouseEnter(): void;
  onMovieCardMouseOut(): void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie, isPlaying, onMovieCardMouseEnter, onMovieCardMouseOut
}: MovieCardProps) => (
  <article
    className="small-movie-card catalog__movies-card"
    onMouseEnter={onMovieCardMouseEnter}
    onMouseOut={onMovieCardMouseOut}
  >
    <Link to={`${AppRoute.MOVIE}/${movie.id}`} className="small-movie-card__link">
      <div className="small-movie-card__image">
        <VideoPlayer
          muted
          isPlaying={isPlaying}
          source={movie.preview}
          poster={movie.previewImage}
        />
      </div>
      <h3 className="small-movie-card__title">
        {movie.title}
      </h3>
    </Link>
  </article>
);

export default MovieCard;
