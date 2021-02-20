import * as React from "react";
import * as renderer from "react-test-renderer";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";
import configureStore from "redux-mock-store";
import history from "../../history";

import ErrorScreen from "./error-screen";

import NameSpace from "../../store/name-space";
import {movieItemMock} from "../../helpers/test-data";
import {AuthorizationStatus} from "../../helpers/const";

const mockStore = configureStore([]);

it(`ErrorScreen should render correctly`, () => {
  const store = mockStore({
    [NameSpace.APP]: {
      currentMovie: movieItemMock,
    },
    [NameSpace.DATA]: {
      isLoadError: true,
    },
    [NameSpace.USER]: {
      authorizationStatus: AuthorizationStatus.NOT_AUTH,
    },
  });

  const tree = renderer
    .create(
        <Router history={history}>
          <Provider store={store}>
            <ErrorScreen />
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
