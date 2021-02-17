import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import SignIn from "./sign-in";

import NameSpace from "../../store/name-space";
import {Pages} from "../../helpers/const";

const mockStore = configureStore([]);

it(`SignIn should render correctly`, () => {
  const store = mockStore({
    [NameSpace.APP]: {
      currentPage: Pages.SIGN_IN,
    },
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <SignIn />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
