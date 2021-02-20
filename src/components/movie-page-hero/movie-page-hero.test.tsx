import * as React from "react";
import * as renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {Router} from "react-router-dom";
import history from "../../history";

import MoviePageHero from "./movie-page-hero";

import NameSpace from "../../store/name-space";
import {movieItemMock, userMock} from "../../helpers/test-data";
import {AuthorizationStatus} from "../../helpers/const";

const mockStore = configureStore([]);

it(`MoviePageHero should render correctly`, () => {
  const store = mockStore({
    [NameSpace.APP]: {
      currentMovie: movieItemMock,
    },
    [NameSpace.USER]: {
      authorizationStatus: AuthorizationStatus.AUTH,
      userInfo: userMock,
    },
  });

  const tree = renderer
    .create(
        <Router history={history}>
          <Provider store={store}>
            <MoviePageHero
              currentMovie={movieItemMock}
            />
          </Provider>
        </Router>, {
          createNodeMock: () => {
            return {};
          }
        }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
