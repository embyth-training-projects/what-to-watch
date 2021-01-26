import React from "react";
import renderer from "react-test-renderer";

import App from "./app";

const movieCardMock = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  releaseDate: 2014,
};

it(`Should App render correctly`, () => {
  const tree = renderer
    .create(<App
      movieCard={movieCardMock}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
