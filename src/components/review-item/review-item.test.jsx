import React from "react";
import renderer from "react-test-renderer";

import ReviewItem from "./review-item";

const reviewMock = {
  author: `Amanda Greever`,
  rating: `8,0`,
  date: `November 18, 2015`,
  content: `I didn't find it amusing, and while I can appreciate the creativity, it's an hour and 40 minutes I wish I could take back.`,
  id: 4563456345,
};

it(`ReviewItem should render correctly`, () => {
  const tree = renderer
    .create(<ReviewItem
      review={reviewMock}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
