import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import MovieNav from "./movie-nav";
import {NavTabs} from "../../utils/const";

configure({adapter: new Adapter()});

const tabs = Object.values(NavTabs);

describe(`MovieNav end-2-end tests`, () => {
  it(`Should pass the right argument of current tab when clicked`, () => {
    const onTabClick = jest.fn((args) => args);

    const movieNavComponent = shallow(
        <MovieNav
          navTabs={NavTabs}
          currentActiveTab={NavTabs.OVERVIEW}
          onTabClick={onTabClick}
        />
    );

    const movieNavTabs = movieNavComponent.find(`.movie-nav__link`);

    movieNavTabs.forEach((tab, index) => {
      tab.simulate(`click`, {preventDefault: onTabClick});

      expect(onTabClick).toHaveBeenCalledWith(tabs[index]);
    });
  });
});
