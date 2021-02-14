import React from "react";
import PropTypes from "prop-types";

import {CustomPropTypes} from "../../helpers/custom-prop-types";

const MoviePlayer = ({currentMovie, renderVideoPlayer, renderPlayPauseButton, onExitButtonClick, onFullScreenButtonClick, videoPlaybackStatus}) => (
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

MoviePlayer.propTypes = {
  currentMovie: CustomPropTypes.MOVIE,
  renderVideoPlayer: PropTypes.func.isRequired,
  renderPlayPauseButton: PropTypes.func.isRequired,
  onExitButtonClick: PropTypes.func.isRequired,
  onFullScreenButtonClick: PropTypes.func.isRequired,
  videoPlaybackStatus: PropTypes.shape({
    timeLeft: PropTypes.string.isRequired,
    currentTime: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    position: PropTypes.number.isRequired,
  }).isRequired,
};

export default MoviePlayer;
