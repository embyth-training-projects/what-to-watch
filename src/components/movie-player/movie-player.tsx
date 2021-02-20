import * as React from "react";

import {MovieInterface} from "../../helpers/types";

interface MoviePlayerProps {
  currentMovie: MovieInterface;
  renderVideoPlayer(): void;
  renderPlayPauseButton(): void;
  onExitButtonClick(): void;
  onFullScreenButtonClick(): void;
  videoPlaybackStatus: {
    timeLeft: string;
    currentTime: number;
    duration: number;
    position: number;
  };
}

const MoviePlayer: React.FC<MoviePlayerProps> = ({
  currentMovie, renderVideoPlayer, renderPlayPauseButton, onExitButtonClick, onFullScreenButtonClick, videoPlaybackStatus
}: MoviePlayerProps) => (
  <div className="player">
    {renderVideoPlayer()}

    <button type="button" className="player__exit" onClick={onExitButtonClick}>Exit</button>

    <div className="player__controls">
      <div className="player__controls-row">
        <div className="player__time">
          <progress className="player__progress" value={videoPlaybackStatus.currentTime} max={videoPlaybackStatus.duration}></progress>
          <div className="player__toggler" style={{left: `${videoPlaybackStatus.position}%`}}>Toggler</div>
        </div>
        <div className="player__time-value">{videoPlaybackStatus.timeLeft}</div>
      </div>

      <div className="player__controls-row">

        {renderPlayPauseButton()}

        <div className="player__name">{currentMovie.title}</div>

        <button type="button" className="player__full-screen" onClick={onFullScreenButtonClick}>
          <svg viewBox="0 0 27 27" width="27" height="27">
            <use xlinkHref="#full-screen"></use>
          </svg>
          <span>Full screen</span>
        </button>
      </div>
    </div>
  </div>
);

export default MoviePlayer;
