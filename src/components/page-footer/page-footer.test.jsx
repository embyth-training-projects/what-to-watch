import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import history from "../../history";

import PageFooter from "./page-footer";

describe(`PageFooter test`, () => {
  it(`Should render correctly on main page`, () => {
    const tree = renderer
      .create(
          <Router history={history}>
            <PageFooter />
          </Router>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Should render correctly on inner page`, () => {
    const tree = renderer
      .create(
          <Router history={history}>
            <PageFooter />
          </Router>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

