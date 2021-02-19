import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import withShowMore from "./with-show-more";

import NameSpace from "../../store/name-space";
import {moviesMock, movieItemMock} from "../../helpers/test-data";
import {ALL_GENRES, Pages} from "../../helpers/const";

const mockStore = configureStore([]);

const MockComponent = () => (
  <div></div>
);

it(`withShowMore is rendered correctly`, () => {
  const MockComponentWrapped = withShowMore(MockComponent);

  const store = mockStore({
    [NameSpace.APP]: {
      currentGenre: ALL_GENRES,
      currentMovie: movieItemMock,
    },
    [NameSpace.DATA]: {
      movies: moviesMock,
    },
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <MockComponentWrapped
            currentPage={Pages.MAIN}
          />
        </Provider>, {
          createNodeMock() {
            return {};
          }
        }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
