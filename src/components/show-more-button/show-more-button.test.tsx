import * as React from "react";
import * as renderer from "react-test-renderer";

import ShowMoreButton from "./show-more-button";

import {noop} from "../../helpers/test-data";

it(`ShowMoreButton should render correctly`, () => {
  const tree = renderer
    .create(
        <ShowMoreButton
          onShowMoreButtonClick={noop}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
