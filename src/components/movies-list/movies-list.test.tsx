import * as React from "react";
import * as renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {Router} from "react-router-dom";
import history from "../../history";

import MoviesList from "./movies-list";

import {moviesMock} from "../../helpers/test-data";

const mockStore = configureStore([]);

it(`Should render correctly movies list`, () => {
  const store = mockStore({});

  const tree = renderer
    .create(
        <Router history={history}>
          <Provider store={store}>
            <MoviesList
              movies={moviesMock}
              render={() => null}
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
