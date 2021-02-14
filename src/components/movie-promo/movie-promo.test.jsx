import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import {MoviePromo} from "./movie-promo";
import {movieItemMock} from "../../helpers/test-data";

const mockStore = configureStore([]);

it(`MoviePromo should render correctly`, () => {
  const store = mockStore({
    currentMovie: movieItemMock,
    currentPage: `main`,
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <MoviePromo
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
