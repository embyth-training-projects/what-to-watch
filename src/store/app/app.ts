import {extend} from "../../helpers/utils";
import {MovieInterface} from "../../helpers/types";
import {ALL_GENRES} from "../../helpers/const";

interface AppStateActionInterface {
  type?: string;
  payload?: string | MovieInterface;
}

interface InitialStateInterface {
  currentMovie?: MovieInterface | {};
  currentGenre?: string;
}

export const initialState: InitialStateInterface = {
  currentMovie: {},
  currentGenre: ALL_GENRES,
};

export const ActionType = {
  SET_CURRENT_MOVIE: `SET_CURRENT_MOVIE`,
  SET_CURRENT_GENRE: `SET_CURRENT_GENRE`,
};

export const ActionCreator = {
  setCurrentMovie: (movie: MovieInterface) => {
    return {
      type: ActionType.SET_CURRENT_MOVIE,
      payload: movie,
    };
  },

  setCurrentGenre: (genre: string) => {
    return {
      type: ActionType.SET_CURRENT_GENRE,
      payload: genre,
    };
  },
};

export const reducer = (state = initialState, action: AppStateActionInterface) => {
  switch (action.type) {
    case ActionType.SET_CURRENT_MOVIE:
      return extend(state, {
        currentMovie: action.payload as MovieInterface,
      });

    case ActionType.SET_CURRENT_GENRE:
      return extend(state, {
        currentGenre: action.payload as string,
      });

    default:
      return state;
  }
};
