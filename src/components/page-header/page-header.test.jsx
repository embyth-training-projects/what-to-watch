import React from "react";
import renderer from "react-test-renderer";

import {PageHeader} from "./page-header";

describe(`PageHeader tests`, () => {
  it(`Should render correctly on main page`, () => {
    const tree = renderer
    .create(
        <PageHeader
          isMainPage={true}
        />
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Should render correctly on inner page`, () => {
    const tree = renderer
    .create(
        <PageHeader
          isMainPage={false}
        />
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

