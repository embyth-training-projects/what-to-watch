import React from "react";
import renderer from "react-test-renderer";

import App from "./app";

import {movieItemMock, moviesMock} from "../../utils/test-data";

it(`Should App render correctly`, () => {
  const tree = renderer
    .create(<App
      promoMovie={movieItemMock}
      movieCards={moviesMock}
    />, {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
