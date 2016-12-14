import React from 'react';
import { connect } from 'react-redux';

import * as actions from 'actions';
import * as screenTypes from 'screenTypes';
import SlideButtons from 'SlideButtons';
import { COPY_DOC } from 'copyDoc';

export class UserScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      copy: COPY_DOC.en.userScreen,
    };

    this.logout = this.logout.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  logout() {
    const { dispatch } = this.props;
    dispatch(actions.startLogout());
  }

  cancel() {
    const { dispatch } = this.props;
    dispatch(actions.setScreenType(screenTypes.DICTIONARY_SCREEN));
  }

  render() {
    const { copy } = this.state;
    const { bgColor, name, pic } = this.props;
    const firstName = name.split(' ')[0];

    return (
      <div className="screen" style={{ background: bgColor }}>
        <div className="slide">
          <div className="slide__contents">
            <div className="profile">
              <img className="profile__pic" src={ pic } alt="Profile picture" />
              <p className="profile__greeting">{ `${copy.greeting} ${firstName}!` }</p>
            </div>
          </div>

          <SlideButtons leftButtonLabel={ copy.leftButton } onLeftButtonSelect={ this.cancel } rightButtonLabel={ copy.rightButton } onRightButtonSelect={ this.logout } />
        </div>
      </div>
    );
  }
}

UserScreen.defaultProps = {
  bgColor: '#2892D7',
}

UserScreen.propTypes = {
  name: React.PropTypes.string.isRequired,
  pic: React.PropTypes.string.isRequired,
}

export default connect((state) => {
  return {
    name: state.auth.name,
    pic: state.auth.pic
  }
})(UserScreen);
