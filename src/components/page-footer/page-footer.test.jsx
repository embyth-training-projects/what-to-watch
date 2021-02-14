import React from "react";
import renderer from "react-test-renderer";

import {PageFooter} from "./page-footer";

describe(`PageFooter test`, () => {
  it(`Should render correctly on main page`, () => {
    const tree = renderer
    .create(<PageFooter
      isMainPage={true}
    />)
    .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Should render correctly on inner page`, () => {
    const tree = renderer
    .create(<PageFooter
      isMainPage={false}
    />)
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

