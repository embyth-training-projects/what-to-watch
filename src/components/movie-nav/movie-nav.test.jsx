import React from "react";
import renderer from "react-test-renderer";

import MovieNav from "./movie-nav";
import {NavTabs} from "../../helpers/const";

it(`MovieNav should render correctly`, () => {
  const tree = renderer
    .create(<MovieNav
      navTabs={NavTabs}
      currentActiveItem={NavTabs.OVERVIEW}
      onItemClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
