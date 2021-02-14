import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import MoviePageHero from "./movie-page-hero";
import {movieItemMock} from "../../helpers/test-data";

const mockStore = configureStore([]);

it(`MoviePageHero should render correctly`, () => {
  const store = mockStore({
    currentMovie: movieItemMock,
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
