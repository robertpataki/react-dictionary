import React from 'react';
import { connect } from 'react-redux';

import * as actions from 'actions';

export class Login extends React.Component {
  constructor(props) {
    super(props);

    this.onLogin = this.onLogin.bind(this);
  }

  onLogin() {
    const { dispatch } = this.props;
    dispatch(actions.startLogin());
  }

  render() {
    return (
      <div className="login">
        <div className="login__contents">
          <img src="images/logo.svg" className="login__logo" />
          <button className="login__button" onClick={ this.onLogin }><i>login</i></button>
          <div className="login__copy">
            <p>Please log in using<br />your Facebook</p>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Login);
