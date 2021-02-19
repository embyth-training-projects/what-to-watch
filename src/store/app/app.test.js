import {initialState, ActionType, reducer, ActionCreator} from "./app";
import {movieItemMock} from "../../helpers/test-data";
import {ALL_GENRES, emptyMovie} from "../../helpers/const";

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
});
