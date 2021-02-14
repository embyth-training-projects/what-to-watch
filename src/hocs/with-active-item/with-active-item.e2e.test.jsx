import React from "react";
import PropTypes from "prop-types";
import {configure, shallow, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import withActiveItem from "./with-active-item";
import {movieItemMock} from "../../helpers/test-data";

configure({adapter: new Adapter()});

const MockComponent = (props) => {
  const {onItemClick} = props;

  return (
    <div>
      <a onClick={onItemClick}></a>
    </div>
  );
};

MockComponent.propTypes = {
  onItemClick: PropTypes.func.isRequired,
};

describe(`HOC withActiveItem end-2-end tests`, () => {
  it(`Should return correct currentActiveItem by default`, () => {
    const MockComponentWrapped = withActiveItem(MockComponent);

    const wrapper = shallow(
        <MockComponentWrapped
          currentMovie={movieItemMock}
          defaultActiveItem={`Overview`}
        />
    );

    expect(wrapper.props().currentActiveItem).toBe(`Overview`);
  });

  it(`Should change change currentActiveItem on HOC's callback`, () => {
    const MockComponentWrapped = withActiveItem(MockComponent);
    const onItemClick = jest.fn((args) => args);

    const wrapper = mount(
        <MockComponentWrapped
          currentMovie={movieItemMock}
          defaultActiveItem={`Overview`}
          onItemClick={onItemClick}
        />
    );

    expect(wrapper.state().currentActiveItem).toBe(`Overview`);

    wrapper.instance()._handleItemClick(`Details`);

    expect(wrapper.state().currentActiveItem).toEqual(`Details`);
  });
});
