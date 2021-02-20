import * as React from "react";
import * as renderer from "react-test-renderer";

import MoviePlayer from "./movie-player";
import {movieItemMock, noop} from "../../helpers/test-data";

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
          renderVideoPlayer={noop}
          renderPlayPauseButton={noop}
          currentMovie={movieItemMock}
          onExitButtonClick={noop}
          onFullScreenButtonClick={noop}
          videoPlaybackStatus={videoPlaybackStatus}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
