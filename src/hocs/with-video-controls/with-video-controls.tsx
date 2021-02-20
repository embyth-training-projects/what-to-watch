import * as React from "react";
import {connect} from "react-redux";
import history from "../../history";

import {getCurrentMovieById} from "../../store/app/selectors";

import {MovieInterface} from "../../helpers/types";
import {getTimeLeft} from "../../helpers/utils";
import {VIDEO_PLAYER_ERROR_MESSAGE} from "../../helpers/const";

interface WithVideoControlsProps {
    currentMovie: MovieInterface;
}

interface WithVideoControlsState {
  isPlaying: boolean;
  videoDuration: number;
  currentVideoTime: number;
}

const withVideoControls = (Component) => {
  class WithVideoControls extends React.PureComponent<WithVideoControlsProps, WithVideoControlsState> {
    private _videoRef: React.RefObject<HTMLVideoElement>;

    constructor(props) {
      super(props);

      this._videoRef = React.createRef();
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

    private _renderVideoPlayer() {
      return (
        <video
          className="player__video"
          ref={this._videoRef}
        >
          {VIDEO_PLAYER_ERROR_MESSAGE}
        </video>
      );
    }

    private _renderPlayPauseButton() {
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

    private _handlePlayPauseChange() {
      const {isPlaying} = this.state;

      this.setState({
        isPlaying: !isPlaying,
      });
    }

    private _handleFullScreenButtonClick(evt) {
      evt.preventDefault();
      this._videoRef.current.requestFullscreen();
    }

    private _handleExitButtonClick(evt) {
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

  const mapStateToProps = (state, ownProps) => ({
    currentMovie: getCurrentMovieById(state, ownProps),
  });

  return connect(mapStateToProps)(WithVideoControls);
};

export default withVideoControls;
