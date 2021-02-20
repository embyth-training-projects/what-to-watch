import * as React from "react";
import * as renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import history from "../../history";

import AddReview from "./add-review";

import NameSpace from "../../store/name-space";
import {movieItemMock, userMock, noop} from "../../helpers/test-data";

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
              onFormSubmit={noop}
              onFormChange={noop}
              onReviewChange={noop}
              onRatingChange={noop}
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
