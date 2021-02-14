import React from "react";
import renderer from "react-test-renderer";

import MoviePlayer from "./movie-player";
import {movieItemMock} from "../../helpers/test-data";

it(`MoviePlayer should render correctly`, () => {
  const videoPlaybackStatus = {
    timeLeft: `0:01:33`,
    currentTime: 100,
    duration: 200,
    position: 50,
  };

  const tree = renderer
    .create(
        <MoviePlayer
          renderVideoPlayer={() => {}}
          renderPlayPauseButton={() => {}}
          currentMovie={movieItemMock}
          onExitButtonClick={() => {}}
          onFullScreenButtonClick={() => {}}
          videoPlaybackStatus={videoPlaybackStatus}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
