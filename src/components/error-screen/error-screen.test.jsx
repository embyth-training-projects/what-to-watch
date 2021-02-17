import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import ErrorScreen from "./error-screen";

import NameSpace from "../../store/name-space";
import {Pages} from "../../helpers/const";

const mockStore = configureStore([]);

it(`Catalog should render correctly`, () => {
  const store = mockStore({
    [NameSpace.APP]: {
      currentPage: Pages.MAIN,
    },
    [NameSpace.DATA]: {
      isError: true,
    },
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <ErrorScreen />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
