import React from "react";
import renderer from "react-test-renderer";

import MainPage from "./main-page";

import {movieItemMock, moviesMock} from "../../helpers/test-data";

it(`Should MainPage render correctly`, () => {
  const tree = renderer
    .create(
        <MainPage
          promoMovie={movieItemMock}
          movieCards={moviesMock}
          onMovieCardClick={() => {}}
        />, {
          createNodeMock: () => {
            return {};
          }
        }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
