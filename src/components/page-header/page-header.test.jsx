import React from "react";
import renderer from "react-test-renderer";

import {PageHeader} from "./page-header";

describe(`PageHeader tests`, () => {
  it(`Should render correctly on main page`, () => {
    const tree = renderer
    .create(
        <PageHeader
          isMainPage={true}
          isSignInPage={false}
          isAuth={false}
          onSignInClick={() => {}}
        />
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Should render correctly on main page with user signed in`, () => {
    const tree = renderer
    .create(
        <PageHeader
          isMainPage={true}
          isSignInPage={false}
          isAuth={true}
          onSignInClick={() => {}}
        />
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Should render correctly on inner page with user signed in`, () => {
    const tree = renderer
    .create(
        <PageHeader
          isMainPage={false}
          isSignInPage={false}
          isAuth={true}
          onSignInClick={() => {}}
        />
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Should render correctly on signin page`, () => {
    const tree = renderer
    .create(
        <PageHeader
          isMainPage={false}
          isSignInPage={true}
          isAuth={false}
          onSignInClick={() => {}}
        />
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

