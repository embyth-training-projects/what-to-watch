import React from "react";
import renderer from "react-test-renderer";

import ReviewItem from "./review-item";

const reviewMock = {
  author: `Amanda Greever`,
  rating: 8.0,
  date: `2019-06-08T14:13:56.569Z`,
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
