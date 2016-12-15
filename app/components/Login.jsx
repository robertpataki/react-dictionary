import React from 'react';
import { connect } from 'react-redux';

import * as actions from 'actions';
import { COPY_DOC } from 'copyDoc';

export class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      copy: COPY_DOC.en.auth,
    };

    this.onLogin = this.onLogin.bind(this);
  }

  onLogin() {
    const { dispatch } = this.props;
    dispatch(actions.startLogin());
  }

  renderWelcomeMessage() {
    const { copy } = this.state;

    return { __html: copy.welcome };
  }

  render() {
    const { copy } = this.state;

    return (
      <div className="login">
        <div className="login__contents">
          <img src="images/logo.svg" className="login__logo" />
          <button className="login__button" onClick={ this.onLogin }><i>{ copy.login }</i></button>
          <div className="login__copy">
            <p dangerouslySetInnerHTML={ this.renderWelcomeMessage() }></p>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Login);
