import React from "react";
import renderer from "react-test-renderer";

import MovieNav from "./movie-nav";
import {NavTabs} from "../../utils/const";

it(`MovieNav should render correctly`, () => {
  const tree = renderer
    .create(<MovieNav
      navTabs={NavTabs}
      currentActiveTab={NavTabs.OVERVIEW}
      onTabClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
