import React from "react";
import {mount, configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import MainPage from "./main-page";

import {movieItemMock, moviesMock} from "../../helpers/test-data";
import {ALL_GENRES, MOVIES_SHOWN} from "../../helpers/const";
import {movies as allGenresMovies} from "../../mock/movies";

configure({adapter: new Adapter()});

const mockStore = configureStore([]);

describe(`MainPage end-2-end tests`, () => {
  it(`Should movie card be clicked`, () => {
    const movieCardClickHandler = jest.fn();

    const store = mockStore({
      currentMovie: movieItemMock,
      movies: moviesMock,
      activeGenre: ALL_GENRES,
      moviesByGenre: moviesMock,
    });

    const mainPageComponent = mount(
        <Provider store={store}>
          <MainPage
            onMovieCardClick={movieCardClickHandler}
          />
        </Provider>
    );

    const movieCards = mainPageComponent.find(`.small-movie-card`);

    movieCards.forEach((card) => card.simulate(`click`));

    expect(movieCardClickHandler.mock.calls.length).toBe(moviesMock.length);
  });

  it(`Should show movies without ShowMoreButton`, () => {
    const movieCardClickHandler = () => {};
    const moviesShown = allGenresMovies.slice(0, 2);

    const store = mockStore({
      currentMovie: movieItemMock,
      movies: moviesMock,
      activeGenre: ALL_GENRES,
      moviesByGenre: moviesShown,
    });

    const mainPageComponent = mount(
        <Provider store={store}>
          <MainPage
            onMovieCardClick={movieCardClickHandler}
          />
        </Provider>
    );

    expect(mainPageComponent.find(`.catalog__button`).length).toBe(0);
    expect(mainPageComponent.find(`.small-movie-card`).length).toBe(moviesShown.length);
  });

  it(`Should show movies with ShowMoreButton`, () => {
    const movieCardClickHandler = () => {};
    const moviesShown = allGenresMovies;

    const store = mockStore({
      currentMovie: movieItemMock,
      movies: moviesMock,
      activeGenre: ALL_GENRES,
      moviesByGenre: moviesShown,
    });

    const mainPageComponent = mount(
        <Provider store={store}>
          <MainPage
            onMovieCardClick={movieCardClickHandler}
          />
        </Provider>
    );

    expect(mainPageComponent.find(`.catalog__button`).length).toBe(1);
    expect(mainPageComponent.find(`.small-movie-card`).length).toBe(MOVIES_SHOWN);

    mainPageComponent.find(`.catalog__button`).simulate(`click`);

    expect(mainPageComponent.find(`.catalog__button`).length).toBe(0);
    expect(mainPageComponent.find(`.small-movie-card`).length).toBe(allGenresMovies.length);
  });
});
