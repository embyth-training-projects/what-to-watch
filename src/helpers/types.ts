export interface ServerMovie {
  [`name`]: string;
  [`genre`]: string;
  [`released`]: number;
  [`background_color`]: string;
  [`background_image`]: string;
  [`preview_image`]: string;
  [`poster_image`]: string;
  [`id`]: number;
  [`description`]: string;
  [`rating`]: number;
  [`scores_count`]: number;
  [`director`]: string;
  [`starring`]: Array<string>;
  [`run_time`]: number;
  [`preview_video_link`]: string;
  [`video_link`]: string;
  [`is_favorite`]: boolean;
}

export interface ServerUser {
  [`id`]: number;
  [`email`]: string;
  [`name`]: string;
  [`avatar_url`]: string;
}

export interface MovieInterface {
  title: string;
  genre: string;
  date: number;
  background: string;
  backgroundColor: string;
  poster: string;
  id: number;
  description: string;
  rating: number;
  votes: number;
  director: string;
  starring: Array<string>;
  preview: string;
  previewImage: string;
  runTime: number;
  videoLink: string;
  isFavorite: boolean;
}

export interface ReviewInterface {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: {
    id: number;
    name: string;
  };
}

export interface UserInterface {
  id: number;
  name: string;
  email: string;
  avatarSrc: string;
}
