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

  renderTotalTranslationsCopy() {
    const { totalTranslations } = this.props;
    const { copy } = this.state;
    const totalString = copy.total.replace('{RPC01}', `<span class="profile__total-num">${totalTranslations}</span>`);

    return { __html: totalString };
  }

  render() {
    const { bgColor, name, pic } = this.props;
    const { copy } = this.state;
    const firstName = name.split(' ')[0];

    return (
      <div className="screen" style={{ background: bgColor }}>
        <div className="slide">
          <div className="slide__contents">
            <a href="https://github.com/robertpataki/react-dictionary" target="_blank"><img className="profile__octocat" src='/images/octocat.svg' alt="Octocat" /></a>

            <div className="profile">
              <p className="profile__greeting">{ `${copy.greeting} ${firstName}!` }</p>
              <img className="profile__pic" src={ pic } alt="Profile picture" />
              <p className="profile__total" dangerouslySetInnerHTML={ this.renderTotalTranslationsCopy() }></p>
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
    pic: state.auth.pic,
    totalTranslations: state.translations.length,
  }
})(UserScreen);
