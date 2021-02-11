import React from "react";
import {configure, mount, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import MoviePage from "./movie-page";
import MovieOverview from "../movie-overview/movie-overview";
import MovieDetails from "../movie-details/movie-details";
import MovieReviews from "../movie-reviews/movie-reviews";

import {NavTabs} from "../../utils/const";
import {movieItemMock, moviesMock, reviewItemMock} from "../../utils/test-data";

configure({adapter: new Adapter()});

describe(`MoviePage end-2-end tests`, () => {
  it(`Should render right screen on different states`, () => {
    const moviePageComponent = shallow(
        <MoviePage
          movies={moviesMock}
          movie={movieItemMock}
          reviews={reviewItemMock}
          onMovieCardClick={() => {}}
        />
    );

    moviePageComponent.setState({currentTab: ``});
    expect(moviePageComponent.find(MovieOverview)).toHaveLength(1);

    moviePageComponent.setState({currentTab: NavTabs.DETAILS});
    expect(moviePageComponent.find(MovieDetails)).toHaveLength(1);

    moviePageComponent.setState({currentTab: NavTabs.OVERVIEW});
    expect(moviePageComponent.find(MovieOverview)).toHaveLength(1);

    moviePageComponent.setState({currentTab: NavTabs.REVIEWS});
    expect(moviePageComponent.find(MovieReviews)).toHaveLength(1);
  });

  it(`Should render right screen on current tab click`, () => {
    const tabs = Object.values(NavTabs);

    const moviePageComponent = mount(
        <MoviePage
          movies={moviesMock}
          movie={movieItemMock}
          reviews={reviewItemMock}
          onMovieCardClick={() => {}}
        />
    );

    const instance = moviePageComponent.instance();

    const movieNavItems = moviePageComponent.find(`.movie-nav__item`);
    movieNavItems.forEach((item, index) => {
      item.simulate(`click`);
      instance._handleTabClick(tabs[index]);
      expect(moviePageComponent.state().currentTab).toEqual(tabs[index]);
    });
  });
});
