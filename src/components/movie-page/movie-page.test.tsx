import * as React from "react";
import * as renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {Router} from "react-router-dom";
import history from "../../history";

import MoviePage from "./movie-page";

import NameSpace from "../../store/name-space";
import {movieItemMock, moviesMock, userMock, noop} from "../../helpers/test-data";
import {AuthorizationStatus} from "../../helpers/const";

const mockStore = configureStore([]);

it(`MoviePage should render correctly`, () => {
  const store = mockStore({
    [NameSpace.APP]: {
      currentMovie: movieItemMock,
    },
    [NameSpace.DATA]: {
      movies: moviesMock,
    },
    [NameSpace.USER]: {
      authorizationStatus: AuthorizationStatus.AUTH,
      userInfo: userMock,
    },
  });

  store.dispatch = jest.fn();

  const tree = renderer
    .create(
        <Router history={history}>
          <Provider store={store}>
            <MoviePage
              loadMovieInfo={noop}
              routeProps={{match: {params: {id: 189234}, isExact: true, path: ``, url: ``}}}
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
