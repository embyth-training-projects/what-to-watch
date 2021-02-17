import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import MoviePage from "./movie-page";

import NameSpace from "../../store/name-space";
import {movieItemMock, moviesMock} from "../../helpers/test-data";
import {AuthorizationStatus} from "../../helpers/const";

const mockStore = configureStore([]);

it(`Should render correctly Movie Page`, () => {
  const store = mockStore({
    [NameSpace.APP]: {
      currentMovie: movieItemMock,
    },
    [NameSpace.DATA]: {
      movies: moviesMock,
    },
    [NameSpace.USER]: {
      authorizationStatus: AuthorizationStatus.AUTH,
    },
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <MoviePage />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
