import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import MoviesList from "./movies-list";

import {moviesMock} from "../../helpers/test-data";

const mockStore = configureStore([]);

it(`Should render correctly movies list`, () => {
  const store = mockStore({});

  const tree = renderer
    .create(
        <Provider store={store}>
          <MoviesList
            movies={moviesMock}
            render={() => {}}
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
