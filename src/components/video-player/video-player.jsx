import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";

const ERROR_MESSAGE = `Sorry, your browser doesn't support embedded videos.`;

export default class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = createRef();
    this._playTimeout = null;
  }

  componentDidMount() {
    const {source, poster, muted} = this.props;
    const video = this._videoRef.current;

    video.src = source;
    video.poster = poster;
    video.muted = muted;
  }

  componentDidUpdate() {
    const video = this._videoRef.current;

    if (this.props.isPlaying) {
      this._playTimeout = setTimeout(() => {
        video.play();
      }, 1000);
    } else {
      video.load();
      clearTimeout(this._playTimeout);
    }
  }

  componentWillUnmount() {
    const video = this._videoRef.current;

    video.src = ``;
    video.poster = ``;
    video.onplay = null;
    video.muted = null;

    clearTimeout(this._playTimeout);
  }

  render() {
    return (
      <video
        width="280"
        height="175"
        ref={this._videoRef}
      >
        {ERROR_MESSAGE}
      </video>
    );
  }
}

VideoPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  source: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  muted: PropTypes.bool.isRequired,
};
