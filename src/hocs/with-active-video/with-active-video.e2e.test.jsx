import React from "react";
import PropTypes from "prop-types";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import withActiveVideo from "./with-active-video";

configure({adapter: new Adapter()});

const MockComponent = (props) => {
  const {onMovieCardMouseEnter, onMovieCardMouseOut} = props;

  return (
    <article
      onMouseEnter={onMovieCardMouseEnter}
      onMouseOut={onMovieCardMouseOut}
    />
  );
};

MockComponent.propTypes = {
  onMovieCardMouseEnter: PropTypes.func.isRequired,
  onMovieCardMouseOut: PropTypes.func.isRequired,
};

describe(`HOC withActiveVideo end-2-end tests`, () => {
  it(`Should return correct state on HOC's callback`, () => {
    const MockComponentWrapped = withActiveVideo(MockComponent);
    const onItemMouseEnter = jest.fn();
    const onItemMouseOut = jest.fn();

    const wrapper = mount(
        <MockComponentWrapped
          onMovieCardMouseEnter={onItemMouseEnter}
          onMovieCardMouseOut={onItemMouseOut}
        />
    );

    expect(wrapper.state().isPlaying).toBe(false);
    wrapper.instance()._handleMovieCardMouseEnter();
    expect(wrapper.state().isPlaying).toBe(true);
    wrapper.instance()._handleMovieCardMouseOut();
    expect(wrapper.state().isPlaying).toBe(false);
  });
});
