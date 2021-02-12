import React from "react";
import {mount, configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import MainPage from "./main-page";

import {movieItemMock, moviesMock} from "../../helpers/test-data";
import {ALL_GENRES} from "../../helpers/const";

configure({adapter: new Adapter()});

const mockStore = configureStore([]);

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
          currentMovie={movieItemMock}
          movies={moviesMock}
          onMovieCardClick={movieCardClickHandler}
        />
      </Provider>
  );

  const movieCards = mainPageComponent.find(`.small-movie-card`);

  movieCards.forEach((card) => card.simulate(`click`));

  expect(movieCardClickHandler.mock.calls.length).toBe(moviesMock.length);
});
