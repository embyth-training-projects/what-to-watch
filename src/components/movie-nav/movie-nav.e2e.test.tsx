import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";

import MovieNav from "./movie-nav";
import {NavTabs} from "../../helpers/const";

configure({adapter: new Adapter()});

const tabs = Object.values(NavTabs);

describe(`MovieNav end-2-end tests`, () => {
  it(`Should pass the right argument of current tab when clicked`, () => {
    const onItemClick = jest.fn((args) => args);

    const movieNavComponent = shallow(
        <MovieNav
          navTabs={NavTabs}
          currentActiveItem={NavTabs.OVERVIEW}
          onItemClick={onItemClick}
        />
    );

    const movieNavTabs = movieNavComponent.find(`.movie-nav__link`);

    movieNavTabs.forEach((tab, index) => {
      tab.simulate(`click`, {preventDefault: onItemClick});

      expect(onItemClick).toHaveBeenCalledWith(tabs[index]);
    });
  });
});
