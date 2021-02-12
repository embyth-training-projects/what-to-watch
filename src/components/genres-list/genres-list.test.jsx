import React from "react";
import renderer from "react-test-renderer";

import GenresList from "./genres-list";
import {genres} from "../../helpers/test-data";

it(`GenresList should render correctly`, () => {
  const tree = renderer
    .create(<GenresList
      genres={genres}
      currentGenre={`All genres`}
      onGenreClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
