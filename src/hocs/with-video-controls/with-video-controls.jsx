import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {ActionCreator} from "../../reducer/reducer";

import {CustomPropTypes} from "../../helpers/custom-prop-types";

const ERROR_MESSAGE = `Sorry, your browser doesn't support embedded videos.`;

const withVideoControls = (Component) => {
  class WithVideoControls extends PureComponent {
    constructor(props) {
      super(props);

      this._videoRef = createRef();
      this.state = {
        isPlaying: true,
      };

      this._renderVideoPlayer = this._renderVideoPlayer.bind(this);
      this._handlePlayButtonClick = this._handlePlayButtonClick.bind(this);
      this._handlePauseButtonClick = this._handlePauseButtonClick.bind(this);
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

    _handlePlayButtonClick() {
      this.setState({
        isPlaying: true,
      });
    }

    _handlePauseButtonClick() {
      this.setState({
        isPlaying: false,
      });
    }

    componentDidMount() {
      const {currentMovie} = this.props;
      const video = this._videoRef.current;

      video.src = currentMovie.videoLink;
      video.poster = currentMovie.poster;

      video.play();
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
    }

    render() {
      const {currentMovie, onExitButtonClick} = this.props;

      return (
        <Component
          {...this.props}
          renderVideoPlayer={this._renderVideoPlayer}
          currentMovie={currentMovie}
          isPlaying={this.state.isPlaying}
          onExitButtonClick={onExitButtonClick}
          onPlayButtonClick={this._handlePlayButtonClick}
          onPauseButtonClick={this._handlePauseButtonClick}
        />
      );
    }
  }

  WithVideoControls.propTypes = {
    currentMovie: CustomPropTypes.MOVIE,
    onExitButtonClick: PropTypes.func.isRequired,
  };

  const mapStateToProps = (state) => ({
    currentMovie: state.currentMovie,
  });

  const mapDispatchToProps = (dispatch) => ({
    onExitButtonClick() {
      dispatch(ActionCreator.stopWatchingMovie());
    },
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithVideoControls);
};

export default withVideoControls;
