import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import PageHeader from "../page-header/page-header";
import PageFooter from "../page-footer/page-footer";

import {Operations as UserOperations} from "../../store/user/user";

class SignIn extends PureComponent {
  constructor(props) {
    super(props);

    this._loginRef = createRef();
    this._passwordRef = createRef();

    this._handleLoginSubmit = this._handleLoginSubmit.bind(this);
  }

  _handleLoginSubmit(evt) {
    const {onLoginSubmit} = this.props;

    const userSignInData = {
      email: this._loginRef.current.value,
      password: this._passwordRef.current.value,
    };

    evt.preventDefault();
    onLoginSubmit(userSignInData);
  }

  render() {
    return (
      <div className="user-page">
        <PageHeader />

        <div className="sign-in user-page__content">
          <form action="#" className="sign-in__form" onSubmit={this._handleLoginSubmit}>
            <div className="sign-in__fields">
              <div className="sign-in__field">
                <input
                  className="sign-in__input"
                  type="email"
                  placeholder="Email address"
                  name="user-email"
                  id="user-email"
                  ref={this._loginRef}
                  required
                />
                <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
              </div>
              <div className="sign-in__field">
                <input
                  className="sign-in__input"
                  type="password"
                  placeholder="Password"
                  name="user-password"
                  id="user-password"
                  ref={this._passwordRef}
                  required
                />
                <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
              </div>
            </div>
            <div className="sign-in__submit">
              <button className="sign-in__btn" type="submit">Sign in</button>
            </div>
          </form>
        </div>

        <PageFooter />
      </div>
    );
  }
}

SignIn.propTypes = {
  onLoginSubmit: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onLoginSubmit(authData) {
    dispatch(UserOperations.login(authData));
  },
});

export default connect(null, mapDispatchToProps)(SignIn);
