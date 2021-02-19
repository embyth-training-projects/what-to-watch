import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import history from "../../history";

import AddReview from "./add-review";

import NameSpace from "../../store/name-space";
import {movieItemMock, userMock} from "../../helpers/test-data";

const mockStore = configureStore([]);

it(`AddReview should render correctly`, () => {
  const store = mockStore({
    [NameSpace.APP]: {
      currentMovie: movieItemMock,
    },
    [NameSpace.USER]: {
      userInfo: userMock,
    },
  });

  const tree = renderer
    .create(
        <Router history={history}>
          <Provider store={store}>
            <AddReview
              currentMovie={movieItemMock}
              onFormSubmit={() => {}}
              onFormChange={() => {}}
              onReviewChange={() => {}}
              onRatingChange={() => {}}
              isSubmitDisabled={true}
              isReviewSending={false}
              isSendingError={false}
            />
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
