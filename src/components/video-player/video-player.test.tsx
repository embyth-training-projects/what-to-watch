import * as React from "react";
import * as renderer from "react-test-renderer";

import ViderPlayer from "./video-player";

const videoData = {
  poster: `img/the-grand-budapest-hotel-poster.jpg`,
  preview: `https://upload.wikimedia.org/wikipedia/commons/7/72/Landwasserviadukt%2C_aerial_video.webm`,
};

it(`Should render correctly VideoPlayer`, () => {
  const tree = renderer
    .create(
        <ViderPlayer
          muted
          isPlaying={false}
          source={videoData.preview}
          poster={videoData.poster}
        />, {
          createNodeMock: () => {
            return {};
          }
        }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
