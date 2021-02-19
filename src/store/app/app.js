import {extend} from "../../helpers/utils";
import {ALL_GENRES} from "../../helpers/const";

export const initialState = {
  currentMovie: {},
  currentGenre: ALL_GENRES,
};

export const ActionType = {
  SET_CURRENT_MOVIE: `SET_CURRENT_MOVIE`,
  SET_CURRENT_GENRE: `SET_CURRENT_GENRE`,
};

export const ActionCreator = {
  setCurrentMovie: (movie) => {
    return {
      type: ActionType.SET_CURRENT_MOVIE,
      payload: movie,
    };
  },

  setCurrentGenre: (genre) => {
    return {
      type: ActionType.SET_CURRENT_GENRE,
      payload: genre,
    };
  },
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_CURRENT_MOVIE:
      return extend(state, {
        currentMovie: action.payload,
      });

    case ActionType.SET_CURRENT_GENRE:
      return extend(state, {
        currentGenre: action.payload,
      });

    default:
      return state;
  }
};
