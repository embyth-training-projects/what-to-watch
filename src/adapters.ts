import {ServerMovie, ServerUser, MovieInterface, UserInterface} from "./helpers/types";

export const createMovie = (movie: ServerMovie): MovieInterface => ({
  title: movie.name,
  genre: movie.genre,
  date: movie.released,
  background: movie.background_image,
  backgroundColor: movie.background_color,
  poster: movie.poster_image,
  id: movie.id,
  description: movie.description,
  rating: movie.rating,
  votes: movie.scores_count,
  director: movie.director,
  starring: movie.starring,
  preview: movie.preview_video_link,
  previewImage: movie.preview_image,
  runTime: movie.run_time,
  videoLink: movie.video_link,
  isFavorite: movie.is_favorite,
});

export const createUser = (user: ServerUser): UserInterface => ({
  id: user.id,
  email: user.email,
  name: user.name,
  avatarSrc: user.avatar_url,
});
