import * as React from "react";
import {configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";

import VideoPlayer from "./video-player";

configure({adapter: new Adapter()});

const videoData = {
  poster: `img/the-grand-budapest-hotel-poster.jpg`,
  preview: `https://upload.wikimedia.org/wikipedia/commons/7/72/Landwasserviadukt%2C_aerial_video.webm`,
};

it(`VideoPlayer Start and Pause works correctly`, () => {
  const isPlaying = false;

  const videoPlayer = mount(
      <VideoPlayer
        muted
        isPlaying={isPlaying}
        source={videoData.preview}
        poster={videoData.poster}
      />
  );

  expect(videoPlayer.props().isPlaying).toEqual(false);

  videoPlayer.setProps({isPlaying: true});
  expect(videoPlayer.props().isPlaying).toEqual(true);
});
