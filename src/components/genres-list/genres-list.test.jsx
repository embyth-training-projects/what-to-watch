import React from "react";
import renderer from "react-test-renderer";

import {GenresList} from "./genres-list";

import {genres} from "../../helpers/test-data";
import {ALL_GENRES} from "../../helpers/const";

it(`GenresList should render correctly`, () => {
  const tree = renderer
    .create(
        <GenresList
          genres={genres}
          currentGenre={ALL_GENRES}
          onGenreClick={() => {}}
        />, {
          createNodeMock: () => {
            return {};
          }
        }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
