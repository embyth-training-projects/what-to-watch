import React from "react";
import PropTypes from "prop-types";

import {CustomPropTypes} from "../../helpers/custom-prop-types";

const MoviePlayer = ({currentMovie, renderVideoPlayer, isPlaying, onExitButtonClick, onPlayButtonClick, onPauseButtonClick}) => (
  <div className="player">
    {renderVideoPlayer()}

    <button type="button" className="player__exit" onClick={onExitButtonClick}>Exit</button>

    <div className="player__controls">
      <div className="player__controls-row">
        <div className="player__time">
          <progress className="player__progress" value="30" max="100"></progress>
          <div className="player__toggler" style={{left: `30%`}}>Toggler</div>
        </div>
        <div className="player__time-value">1:30:29</div>
      </div>

      <div className="player__controls-row">

        {isPlaying
          ? <button type="button" className="player__play" onClick={onPauseButtonClick}>
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref="#pause"></use>
            </svg>
            <span>Pause</span>
          </button>
          : <button type="button" className="player__play" onClick={onPlayButtonClick}>
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref="#play-s"></use>
            </svg>
            <span>Play</span>
          </button>
        }

        <div className="player__name">{currentMovie.title}</div>

        <button type="button" className="player__full-screen">
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
  isPlaying: PropTypes.bool.isRequired,
  renderVideoPlayer: PropTypes.func.isRequired,
  onExitButtonClick: PropTypes.func.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  onPauseButtonClick: PropTypes.func.isRequired,
};

export default MoviePlayer;
