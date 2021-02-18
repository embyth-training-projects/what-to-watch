export const NavTabs = {
  OVERVIEW: `Overview`,
  DETAILS: `Details`,
  REVIEWS: `Reviews`,
};

export const Pages = {
  MAIN: `main`,
  MOVIE: `movie`,
  VIDEO: `video`,
  SIGN_IN: `sign-in`,
  ADD_REVIEW: `add-review`,
};

export const CardVideoPlayerParams = {
  WIDTH: `280`,
  HEIGHT: `175`,
};

export const emptyMovie = {
  title: `Loading...`,
  genre: ``,
  date: 0,
  background: ``,
  backgroundColor: ``,
  poster: ``,
  id: 0,
  description: ``,
  rating: 0,
  votes: 0,
  director: ``,
  starring: [],
  preview: ``,
  previewImage: ``,
  runTime: 0,
  videoLink: ``,
  isFavorite: false,
};

export const emptyUser = {
  id: 0,
  email: ``,
  name: ``,
  avatarSrc: ``,
};

export const ApiConfig = {
  URL: `https://5.react.pages.academy/wtw`,
  TIMEOUT: 5000,
  COOKIES: true,
};

export const ErrorStatusCode = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL: 500,
  SERVICE_UNAVAILABLE: 503,
};

export const AuthorizationStatus = {
  AUTH: `AUTH`,
  NOT_AUTH: `NOT_AUTH`,
};

export const RequestStatus = {
  NOT_SENT: `NOT_SENT`,
  SENDING: `SENDING`,
  SUCCESS: `SUCCESS`,
  ERROR: `ERROR`,
};

export const Review = {
  MIN_LENGTH: 50,
  MAX_LENGTH: 400,
  RATINGS: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  BUTTON_LABEL: {
    POST: `Post`,
    SENDING: `Sending...`,
  },
};

export const ALL_GENRES = `All genres`;

export const MOVIES_SHOWN = 8;

export const MOVIES_LIKE_THIS_SHOWN = 4;

export const MAX_SHOWN_GENRES = 10;
