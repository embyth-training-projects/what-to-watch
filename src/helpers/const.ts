export const ALL_GENRES = `All genres`;
export const VIDEO_PLAYER_ERROR_MESSAGE = `Sorry, your browser doesn't support embedded videos.`;
export const MOVIES_SHOWN = 8;
export const MOVIES_LIKE_THIS_SHOWN = 4;
export const MAX_SHOWN_GENRES = 10;

export enum NavTabs {
  OVERVIEW = `Overview`,
  DETAILS = `Details`,
  REVIEWS = `Reviews`,
}

export enum Pages {
  MAIN = `main`,
  MOVIE = `movie`,
  VIDEO = `video`,
  SIGN_IN = `sign-in`,
  ADD_REVIEW = `add-review`,
  MY_LIST = `my-list`,
  ERROR = `error`,
}

export enum CardVideoPlayerParams {
  WIDTH = `280`,
  HEIGHT = `175`,
}

export enum AppRoute {
  ROOT = `/`,
  SIGN_IN = `/login`,
  MY_LIST = `/mylist`,
  MOVIE = `/films`,
  ADD_REVIEW = `/review`,
  PLAYER = `/player`,
}

export enum Favorites {
  ADD = 1,
  REMOVE = 0,
}

export enum ErrorStatusCode {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL = 500,
  SERVICE_UNAVAILABLE = 503,
}

export enum AuthorizationStatus {
  AUTH = `AUTH`,
  NOT_AUTH = `NOT_AUTH`,
}

export enum RequestStatus {
  NOT_SENT = `NOT_SENT`,
  SENDING = `SENDING`,
  SUCCESS = `SUCCESS`,
  ERROR = `ERROR`,
}

interface ApiConfigInterface {
  URL: string;
  TIMEOUT: number;
  COOKIES: boolean;
}

export const ApiConfig: ApiConfigInterface = {
  URL: `https://5.react.pages.academy/wtw`,
  TIMEOUT: 5000,
  COOKIES: true,
};

interface ReviewParamsInterface {
  MIN_LENGTH: number;
  MAX_LENGTH: number;
  RATINGS: Array<number>;
  BUTTON_LABEL: {
    POST: string;
    SENDING: string;
  };
}

export const Review: ReviewParamsInterface = {
  MIN_LENGTH: 50,
  MAX_LENGTH: 400,
  RATINGS: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  BUTTON_LABEL: {
    POST: `Post`,
    SENDING: `Sending...`,
  },
};
