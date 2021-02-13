import React, {PureComponent} from "react";
import PropTypes from "prop-types";

const withActiveItem = (Component) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        currentActiveItem: props.defaultActiveItem,
      };

      this._handleItemClick = this._handleItemClick.bind(this);
    }

    _handleItemClick(activeItem) {
      this.setState({
        currentActiveItem: activeItem,
      });
    }

    componentDidUpdate(prevProps) {
      if (prevProps !== this.props) {
        this.setState({
          currentActiveItem: this.props.defaultActiveItem,
        });
      }
    }

    render() {
      return (
        <Component
          {...this.props}
          onItemClick={this._handleItemClick}
          currentActiveItem={this.state.currentActiveItem}
        />
      );
    }
  }

  WithActiveItem.propTypes = {
    defaultActiveItem: PropTypes.string.isRequired,
  };

  return WithActiveItem;
};

export default withActiveItem;
