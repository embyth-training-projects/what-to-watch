import React from "react";
import renderer from "react-test-renderer";

import MainPage from "./main-page";

const movieCardMock = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  releaseDate: 2014,
};

it(`Should MainPage render correctly`, () => {
  const tree = renderer
    .create(
        <MainPage
          movieCard={movieCardMock}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
