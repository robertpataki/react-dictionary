import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';

export class UserBar extends React.Component {
  constructor(props) {
    super(props);

    this.onLogout = this.onLogout.bind(this);
  }

  onLogout(e) {
    const { dispatch } = this.props;
    e.preventDefault();

    dispatch(actions.startLogout());
  }

  render() {
    const { name, pic } = this.props;
    const firstName = name.split(' ')[0];

    return (
      <div className="user-bar">
        <span className="user-bar__name">{ `Hello ${firstName}` }</span>
        <img className="user-bar__pic" src={ pic } alt="Profile picture" />
        <a className="user-bar__logout" href="#" onClick={ this.onLogout }>Log out</a>
      </div>
    );
  }
}

UserBar.propTypes = {
  name: React.PropTypes.string.isRequired,
  pic: React.PropTypes.string.isRequired,
}

export default connect(
  (state) => {
    return {
      name: state.auth.name,
      pic: state.auth.pic
    }
  }
)(UserBar);
