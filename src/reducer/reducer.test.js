import {initialState, ActionType, reducer} from "./reducer";
import {moviesMock} from "../helpers/test-data";
import {ALL_GENRES} from "../helpers/const";

describe(`Reducer tests`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`Reducer should return right current genre`, () => {
    expect(reducer({
      currentGenre: ALL_GENRES,
    }, {
      type: ActionType.SET_ACTIVE_GENRE,
      payload: `Drama`,
    })).toEqual({
      currentGenre: `Drama`,
    });
  });

  it(`Reducer should return new current page and update current movie`, () => {
    expect(reducer({
      currentMovie: moviesMock,
      currentPage: `main`,
    }, {
      type: ActionType.GO_TO_MOVIE_PAGE,
      payload: {
        currentMovie: moviesMock,
        currentPage: `movie`,
      },
    })).toEqual({
      currentMovie: moviesMock,
      currentPage: `movie`,
    });
  });
});
