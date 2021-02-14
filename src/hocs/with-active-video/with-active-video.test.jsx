import React from "react";
import renderer from "react-test-renderer";

import withActiveVideo from "./with-active-video";
import {movieItemMock} from "../../helpers/test-data";

const MockComponent = () => (
  <div></div>
);

it(`withActiveItem is rendered correctly`, () => {
  const MockComponentWrapped = withActiveVideo(MockComponent);

  const tree = renderer
    .create(
        <MockComponentWrapped
          movie={movieItemMock}
        />, {
          createNodeMock() {
            return {};
          }
        }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
