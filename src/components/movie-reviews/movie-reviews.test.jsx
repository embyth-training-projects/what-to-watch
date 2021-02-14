import React from "react";
import renderer from "react-test-renderer";

import {MovieReviews} from "./movie-reviews";
import {reviewItemMock} from "../../helpers/test-data";

it(`MovieReviews should render correctly`, () => {
  const tree = renderer
    .create(<MovieReviews
      moviesReviews={reviewItemMock}
    />, {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
