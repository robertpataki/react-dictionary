import React from 'react';
import { connect } from 'react-redux';

import * as actions from 'actions';
import * as screenTypes from 'screenTypes';

export class UserBar extends React.Component {
  constructor(props) {
    super(props);

    this.onProfilePicSelect = this.onProfilePicSelect.bind(this);
  }

  onProfilePicSelect(e) {
    const { dispatch } = this.props;
    dispatch(actions.setScreenType(screenTypes.USER_PROFILE_SCREEN));
  }

  render() {
    const { pic } = this.props;

    return (
      <div className="user-bar">
        <img className="user-bar__pic" src={ pic } alt="Profile picture" onClick={ this.onProfilePicSelect } />
      </div>
    );
  }
}

UserBar.propTypes = {
  pic: React.PropTypes.string.isRequired,
}

export default connect(
  (state) => {
    return {
      pic: state.auth.pic
    }
  }
)(UserBar);
