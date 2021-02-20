import * as React from "react";

import {CardVideoPlayerParams, VIDEO_PLAYER_ERROR_MESSAGE} from "../../helpers/const";

interface VideoPlayerProps {
  isPlaying: boolean;
  source: string;
  poster: string;
  muted: boolean;
}

export default class VideoPlayer extends React.PureComponent<VideoPlayerProps, {}> {
  private _videoRef: React.RefObject<HTMLVideoElement>;
  private _playTimeout: ReturnType<typeof setTimeout>;

  constructor(props) {
    super(props);

    this._videoRef = React.createRef();
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
        width={CardVideoPlayerParams.WIDTH}
        height={CardVideoPlayerParams.HEIGHT}
        ref={this._videoRef}
      >
        {VIDEO_PLAYER_ERROR_MESSAGE}
      </video>
    );
  }
}
