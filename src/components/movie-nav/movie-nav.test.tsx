import * as React from "react";
import * as renderer from "react-test-renderer";

import MovieNav from "./movie-nav";
import {NavTabs} from "../../helpers/const";
import {noop} from "../../helpers/test-data";

it(`MovieNav should render correctly`, () => {
  const tree = renderer
    .create(
        <MovieNav
          navTabs={NavTabs}
          currentActiveItem={NavTabs.OVERVIEW}
          onItemClick={noop}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
