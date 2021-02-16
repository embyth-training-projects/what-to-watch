import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import withShowMore from "./with-show-more";

import NameSpace from "../../store/name-space";
import {moviesMock} from "../../helpers/test-data";
import {Pages} from "../../helpers/const";

const mockStore = configureStore([]);

const MockComponent = () => (
  <div></div>
);

it(`withShowMore is rendered correctly`, () => {
  const MockComponentWrapped = withShowMore(MockComponent);

  const store = mockStore({
    [NameSpace.APP]: {
      currentPage: Pages.MAIN,
    },
    [NameSpace.DATA]: {
      movies: moviesMock,
    },
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <MockComponentWrapped />
        </Provider>, {
          createNodeMock() {
            return {};
          }
        }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
