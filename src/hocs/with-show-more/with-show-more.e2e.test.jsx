import React from "react";
import PropTypes from "prop-types";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import withShowMore from "./with-show-more";

import NameSpace from "../../store/name-space";
import {moviesMock} from "../../helpers/test-data";
import {ALL_GENRES, Pages} from "../../helpers/const";

configure({adapter: new Adapter()});
const mockStore = configureStore([]);

const MockComponent = (props) => {
  const {onShowMoreButtonClick} = props;

  return (
    <div>
      <button
        onClick={onShowMoreButtonClick}
      />
    </div>
  );
};

MockComponent.propTypes = {
  onShowMoreButtonClick: PropTypes.func.isRequired,
};

describe(`HOC withShowMore end-2-end tests`, () => {
  it(`Should call props callback on child button click`, () => {
    const MockComponentWrapped = withShowMore(MockComponent);
    const onShowMoreButtonClick = jest.fn();

    const store = mockStore({
      [NameSpace.APP]: {
        currentGenre: ALL_GENRES,
      },
      [NameSpace.DATA]: {
        movies: moviesMock,
      },
    });

    const wrapper = mount(
        <Provider store={store}>
          <MockComponentWrapped
            currentPage={Pages.MAIN}
            onShowMoreButtonClick={onShowMoreButtonClick}
          />
        </Provider>, {
          createNodeMock() {
            return {};
          }
        }
    );

    wrapper.find(`button`).simulate(`click`);
    expect(onShowMoreButtonClick).toHaveBeenCalledTimes(1);
  });
});
