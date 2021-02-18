import React from "react";
import renderer from "react-test-renderer";

import {PageHeader} from "./page-header";

import {userMock, movieItemMock} from "../../helpers/test-data";
import {emptyUser} from "../../helpers/const";

describe(`PageHeader tests`, () => {
  it(`Should render correctly on main page`, () => {
    const tree = renderer
    .create(
        <PageHeader
          isMainPage={true}
          isSignInPage={false}
          isAuth={false}
          userInfo={emptyUser}
          onSignInClick={() => {}}
          isPageWithBreadcrumbs={false}
          currentMovie={movieItemMock}
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
          userInfo={userMock}
          onSignInClick={() => {}}
          isPageWithBreadcrumbs={false}
          currentMovie={movieItemMock}
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
          userInfo={userMock}
          onSignInClick={() => {}}
          isPageWithBreadcrumbs={false}
          currentMovie={movieItemMock}
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
          userInfo={emptyUser}
          onSignInClick={() => {}}
          isPageWithBreadcrumbs={false}
          currentMovie={movieItemMock}
        />
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Should render correctly on add review page`, () => {
    const tree = renderer
    .create(
        <PageHeader
          isMainPage={false}
          isSignInPage={false}
          isAuth={false}
          userInfo={userMock}
          onSignInClick={() => {}}
          isPageWithBreadcrumbs={true}
          currentMovie={movieItemMock}
        />
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

