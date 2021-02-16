import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {ActionCreator} from "../../store/app/app";
import {getCurrentMovie} from "../../store/app/selectors";

import {CustomPropTypes} from "../../helpers/custom-prop-types";
import {getTimeLeft} from "../../helpers/utils";

const ERROR_MESSAGE = `Sorry, your browser doesn't support embedded videos.`;

const withVideoControls = (Component) => {
  class WithVideoControls extends PureComponent {
    constructor(props) {
      super(props);

      this._videoRef = createRef();
      this.state = {
        isPlaying: true,
        videoDuration: 0,
        currentVideoTime: 0,
      };

      this._renderVideoPlayer = this._renderVideoPlayer.bind(this);
      this._renderPlayPauseButton = this._renderPlayPauseButton.bind(this);
      this._handlePlayPauseChange = this._handlePlayPauseChange.bind(this);
      this._handleFullScreenButtonClick = this._handleFullScreenButtonClick.bind(this);
    }

    _renderVideoPlayer() {
      return (
        <video
          className="player__video"
          ref={this._videoRef}
        >
          {ERROR_MESSAGE}
        </video>
      );
    }

    _renderPlayPauseButton() {
      const {isPlaying} = this.state;

      return (
        <button type="button" className="player__play" onClick={this._handlePlayPauseChange}>
          {isPlaying
            ? <svg viewBox="0 0 14 21" width="14" height="21">
              <use xlinkHref="#pause"></use>
            </svg>
            : <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref="#play-s"></use>
            </svg>
          }

          <span>{isPlaying ? `Pause` : `Play`}</span>
        </button>
      );
    }

    _handlePlayPauseChange() {
      const {isPlaying} = this.state;

      this.setState({
        isPlaying: !isPlaying,
      });
    }

    _handleFullScreenButtonClick(evt) {
      evt.preventDefault();
      this._videoRef.current.requestFullscreen();
    }

    componentDidMount() {
      const {currentMovie} = this.props;
      const video = this._videoRef.current;

      video.src = currentMovie.videoLink;
      video.poster = currentMovie.poster;

      video.play();

      video.onloadedmetadata = () => this.setState({
        videoDuration: video.duration,
      });

      video.ontimeupdate = () => this.setState({
        currentVideoTime: Math.trunc(video.currentTime),
      });
    }

    componentDidUpdate() {
      const {isPlaying} = this.state;
      const video = this._videoRef.current;

      if (isPlaying) {
        video.play();
      } else {
        video.pause();
      }
    }

    componentWillUnmount() {
      const video = this._videoRef.current;

      video.src = ``;
      video.poster = ``;
      video.onloadedmetadata = null;
      video.ontimeupdate = null;
    }

    render() {
      const {currentMovie, onExitButtonClick} = this.props;
      const {videoDuration, currentVideoTime} = this.state;
      const videoPlaybackStatus = {
        timeLeft: getTimeLeft(videoDuration, currentVideoTime),
        currentTime: currentVideoTime,
        duration: videoDuration,
        position: currentVideoTime / videoDuration * 100,
      };

      return (
        <Component
          {...this.props}
          renderVideoPlayer={this._renderVideoPlayer}
          renderPlayPauseButton={this._renderPlayPauseButton}
          currentMovie={currentMovie}
          onExitButtonClick={onExitButtonClick}
          onFullScreenButtonClick={this._handleFullScreenButtonClick}
          videoPlaybackStatus={videoPlaybackStatus}
        />
      );
    }
  }

  WithVideoControls.propTypes = {
    currentMovie: CustomPropTypes.MOVIE,
    onExitButtonClick: PropTypes.func.isRequired,
  };

  const mapStateToProps = (state) => ({
    currentMovie: getCurrentMovie(state),
  });

  const mapDispatchToProps = (dispatch) => ({
    onExitButtonClick() {
      dispatch(ActionCreator.stopWatchingMovie());
    },
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithVideoControls);
};

export default withVideoControls;
