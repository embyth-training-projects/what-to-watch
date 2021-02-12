import React from "react";
import renderer from "react-test-renderer";

import PageHeader from "./page-header";

it(`PageHeader should render correctly`, () => {
  const tree = renderer
    .create(<PageHeader />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
