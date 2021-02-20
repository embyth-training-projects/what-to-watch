import * as React from "react";
import * as renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {Router} from "react-router-dom";
import history from "../../history";
import thunk from "redux-thunk";

import MyListButton from "./my-list-button";

import NameSpace from "../../store/name-space";
import {AuthorizationStatus} from "../../helpers/const";
import {movieItemMock} from "../../helpers/test-data";

const mockStore = configureStore([thunk]);

it(`MyListButton should render correctly`, () => {
  const store = mockStore({
    [NameSpace.USER]: {
      authorizationStatus: AuthorizationStatus.AUTH,
    },
  });

  const tree = renderer
    .create(
        <Router history={history}>
          <Provider store={store}>
            <MyListButton movie={movieItemMock} />
          </Provider>
        </Router>, {
          createNodeMock: () => {
            return {};
          }
        }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
