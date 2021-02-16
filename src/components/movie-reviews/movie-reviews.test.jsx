import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import MovieReviews from "./movie-reviews";

import NameSpace from "../../store/name-space";
import {reviewsMock} from "../../helpers/test-data";

const mockStore = configureStore([]);

it(`MovieReviews should render correctly`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      movieReviews: reviewsMock,
    },
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <MovieReviews
            movieReviews={reviewsMock}
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
