import React from "react";
import renderer from "react-test-renderer";

import App from "./app";

import {movieItemMock, moviesMock, reviewsMock} from "../../utils/test-data";

it(`Should App render correctly`, () => {
  const tree = renderer
    .create(<App
      promoMovie={movieItemMock}
      movieCards={moviesMock}
      moviesReviews={reviewsMock}
    />, {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
