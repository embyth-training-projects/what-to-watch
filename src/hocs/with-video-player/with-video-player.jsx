import React, {PureComponent} from "react";

const withVideoPlayer = (Component) => {
  class WithVideoPlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isPlaying: false,
      };

      this._handleMovieCardMouseEnter = this._handleMovieCardMouseEnter.bind(this);
      this._handleMovieCardMouseOut = this._handleMovieCardMouseOut.bind(this);
    }

    _handleMovieCardMouseEnter() {
      this.setState({
        isPlaying: true,
      });
    }

    _handleMovieCardMouseOut() {
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

  return WithVideoPlayer;
};

export default withVideoPlayer;
