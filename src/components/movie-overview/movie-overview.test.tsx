import * as React from "react";
import * as renderer from "react-test-renderer";

import MovieOverview from "./movie-overview";
import {movieItemMock} from "../../helpers/test-data";

it(`MovieOverview should render correctly`, () => {
  const tree = renderer
    .create(
        <MovieOverview
          movie={movieItemMock}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
