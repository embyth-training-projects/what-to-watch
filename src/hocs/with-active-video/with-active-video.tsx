import * as React from "react";
import {Subtract} from "utility-types";

interface InjectingProps {
  isPlaying: boolean;
  onMovieCardMouseEnter(): void;
  onMovieCardMouseOut(): void;
}

interface WithActiveVideoState {
  isPlaying: boolean;
}

const withActiveVideo = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>;

  class WithActiveVideo extends React.PureComponent<T, WithActiveVideoState> {
    constructor(props) {
      super(props);

      this.state = {
        isPlaying: false,
      };

      this._handleMovieCardMouseEnter = this._handleMovieCardMouseEnter.bind(this);
      this._handleMovieCardMouseOut = this._handleMovieCardMouseOut.bind(this);
    }

    private _handleMovieCardMouseEnter() {
      this.setState({
        isPlaying: true,
      });
    }

    private _handleMovieCardMouseOut() {
      this.setState({
        isPlaying: false,
      });
    }

    render() {
      return (
        <Component
          {...this.props}
          isPlaying={this.state.isPlaying}
          onMovieCardMouseEnter={this._handleMovieCardMouseEnter}
          onMovieCardMouseOut={this._handleMovieCardMouseOut}
        />
      );
    }
  }

  return WithActiveVideo;
};

export default withActiveVideo;
