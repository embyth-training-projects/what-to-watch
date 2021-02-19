import React, {PureComponent, createRef} from "react";
import {connect} from "react-redux";
import history from "../../history";

import {getCurrentMovieById} from "../../store/app/selectors";

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
      this._handleExitButtonClick = this._handleExitButtonClick.bind(this);
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

    _handleExitButtonClick(evt) {
      evt.preventDefault();
      history.goBack();
    }

    componentDidMount() {
      const {currentMovie} = this.props;
      const video = this._videoRef.current;

      video.src = currentMovie.videoLink;
      video.poster = currentMovie.background;

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
      const {currentMovie} = this.props;
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
          currentMovie={currentMovie}
          videoPlaybackStatus={videoPlaybackStatus}
          onExitButtonClick={this._handleExitButtonClick}
          onFullScreenButtonClick={this._handleFullScreenButtonClick}
          renderVideoPlayer={this._renderVideoPlayer}
          renderPlayPauseButton={this._renderPlayPauseButton}
        />
      );
    }
  }

  WithVideoControls.propTypes = {
    currentMovie: CustomPropTypes.MOVIE,
  };

  const mapStateToProps = (state, ownProps) => ({
    currentMovie: getCurrentMovieById(state, ownProps),
  });

  return connect(mapStateToProps)(WithVideoControls);
};

export default withVideoControls;
