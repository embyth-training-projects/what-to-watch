import * as React from "react";
import * as renderer from "react-test-renderer";

import {GenresList} from "./genres-list";

import {genres, noop} from "../../helpers/test-data";
import {ALL_GENRES} from "../../helpers/const";

it(`GenresList should render correctly`, () => {
  const tree = renderer
    .create(
        <GenresList
          genres={genres}
          currentGenre={ALL_GENRES}
          onGenreClick={noop}
        />, {
          createNodeMock: () => {
            return {};
          }
        }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
