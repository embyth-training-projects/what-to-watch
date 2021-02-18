import {initialState, ActionType, reducer, ActionCreator} from "./app";
import {movieItemMock} from "../../helpers/test-data";
import {ALL_GENRES, Pages, emptyMovie} from "../../helpers/const";

describe(`App State Reducer tests`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`Reducer should return right current genre`, () => {
    expect(reducer({
      currentGenre: ALL_GENRES,
    }, {
      type: ActionType.SET_CURRENT_GENRE,
      payload: `Drama`,
    })).toEqual({
      currentGenre: `Drama`,
    });
  });

  it(`Reducer should return right current movie`, () => {
    expect(reducer({
      currentMovie: emptyMovie,
    }, {
      type: ActionType.SET_CURRENT_MOVIE,
      payload: movieItemMock,
    })).toEqual({
      currentMovie: movieItemMock,
    });
  });

  it(`Reducer should return movie as current page`, () => {
    expect(reducer({
      currentPage: Pages.MAIN,
    }, {
      type: ActionType.GO_TO_MOVIE_PAGE,
      payload: Pages.MOVIE,
    })).toEqual({
      currentPage: Pages.MOVIE,
    });
  });

  it(`Reducer should return main as current page`, () => {
    expect(reducer({
      currentPage: Pages.MOVIE,
    }, {
      type: ActionType.GO_TO_MAIN_PAGE,
      payload: Pages.MAIN,
    })).toEqual({
      currentPage: Pages.MAIN,
    });
  });

  it(`Reducer should return sign-in as current page`, () => {
    expect(reducer({
      currentPage: Pages.MAIN,
    }, {
      type: ActionType.GO_TO_SIGN_IN_PAGE,
      payload: Pages.SIGN_IN,
    })).toEqual({
      currentPage: Pages.SIGN_IN,
    });
  });

  it(`Reducer should return add-review as current page`, () => {
    expect(reducer({
      currentPage: Pages.MOVIE,
    }, {
      type: ActionType.ADD_REVIEW,
      payload: Pages.ADD_REVIEW,
    })).toEqual({
      currentPage: Pages.ADD_REVIEW,
    });
  });

  it(`Reducer should return true value of isMoviePlayerActive state`, () => {
    expect(reducer({
      isMoviePlayerActive: false,
    }, {
      type: ActionType.WATCH_MOVIE,
      payload: true,
    })).toEqual({
      isMoviePlayerActive: true,
    });
  });

  it(`Reducer should return false value of isMoviePlayerActive state`, () => {
    expect(reducer({
      isMoviePlayerActive: true,
    }, {
      type: ActionType.STOP_WATCHING_MOVIE,
      payload: false,
    })).toEqual({
      isMoviePlayerActive: false,
    });
  });
});

describe(`Action creators work correctly`, () => {
  it(`setCurrentMovie returns correct action`, () => {
    expect(ActionCreator.setCurrentMovie(movieItemMock)).toEqual({
      type: ActionType.SET_CURRENT_MOVIE,
      payload: movieItemMock,
    });
  });

  it(`setCurrentGenre returns correct action`, () => {
    expect(ActionCreator.setCurrentGenre(`Drama`)).toEqual({
      type: ActionType.SET_CURRENT_GENRE,
      payload: `Drama`,
    });
  });

  it(`goToMainPage returns correct action`, () => {
    expect(ActionCreator.goToMainPage()).toEqual({
      type: ActionType.GO_TO_MAIN_PAGE,
      payload: Pages.MAIN,
    });
  });

  it(`goToMoviePage returns correct action`, () => {
    expect(ActionCreator.goToMoviePage()).toEqual({
      type: ActionType.GO_TO_MOVIE_PAGE,
      payload: Pages.MOVIE,
    });
  });

  it(`goToSignInPage returns correct action`, () => {
    expect(ActionCreator.goToSignInPage()).toEqual({
      type: ActionType.GO_TO_SIGN_IN_PAGE,
      payload: Pages.SIGN_IN,
    });
  });

  it(`addReview returns correct action`, () => {
    expect(ActionCreator.addReview()).toEqual({
      type: ActionType.ADD_REVIEW,
      payload: Pages.ADD_REVIEW,
    });
  });

  it(`watchMovie returns correct action`, () => {
    expect(ActionCreator.watchMovie()).toEqual({
      type: ActionType.WATCH_MOVIE,
      payload: true,
    });
  });

  it(`stopWatchingMovie returns correct action`, () => {
    expect(ActionCreator.stopWatchingMovie()).toEqual({
      type: ActionType.STOP_WATCHING_MOVIE,
      payload: false,
    });
  });
});
