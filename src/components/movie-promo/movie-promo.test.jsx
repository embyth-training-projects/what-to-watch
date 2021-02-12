import React from "react";
import renderer from "react-test-renderer";

import MoviePromo from "./movie-promo";
import {movieItemMock} from "../../helpers/test-data";

it(`MoviePromo should render correctly`, () => {
  const tree = renderer
    .create(<MoviePromo
      currentMovie={movieItemMock}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
