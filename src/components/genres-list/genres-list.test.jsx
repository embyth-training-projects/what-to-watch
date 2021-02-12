import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import GenresList from "./genres-list";
import {genres} from "../../helpers/test-data";
import {ALL_GENRES} from "../../helpers/const";

const mockStore = configureStore([]);

it(`GenresList should render correctly`, () => {
  const store = mockStore({
    currentGenre: ALL_GENRES,
    genres,
  });

  store.dispatch = jest.fn();

  const tree = renderer
    .create(
        <Provider store={store}>
          <GenresList
            genres={genres}
            currentGenre={`All genres`}
            onGenreClick={() => {}}
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
