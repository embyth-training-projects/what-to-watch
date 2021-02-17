import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import MoviePromo from "./movie-promo";

import NameSpace from "../../store/name-space";
import {movieItemMock, userMock} from "../../helpers/test-data";
import {Pages, AuthorizationStatus} from "../../helpers/const";

const mockStore = configureStore([]);

it(`MoviePromo should render correctly`, () => {
  const store = mockStore({
    [NameSpace.APP]: {
      currentPage: Pages.MAIN,
    },
    [NameSpace.DATA]: {
      moviePromo: movieItemMock,
    },
    [NameSpace.USER]: {
      authorizationStatus: AuthorizationStatus.AUTH,
      userInfo: userMock,
    },
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <MoviePromo
            currentMovie={movieItemMock}
            onPlayButtonClick={() => {}}
          />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
