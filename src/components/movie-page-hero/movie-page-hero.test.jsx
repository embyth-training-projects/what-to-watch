import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import MoviePageHero from "./movie-page-hero";

import NameSpace from "../../store/name-space";
import {movieItemMock, userMock} from "../../helpers/test-data";
import {Pages, AuthorizationStatus} from "../../helpers/const";

const mockStore = configureStore([]);

it(`MoviePageHero should render correctly`, () => {
  const store = mockStore({
    [NameSpace.APP]: {
      currentPage: Pages.MOVIE,
    },
    [NameSpace.USER]: {
      authorizationStatus: AuthorizationStatus.AUTH,
      userInfo: userMock,
    },
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <MoviePageHero
            currentMovie={movieItemMock}
          />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
