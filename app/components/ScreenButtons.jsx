import React from 'react';

export class ScreenButtons extends React.Component {
  render() {
    const { leftButtonLabel, rightButtonLabel } = this.props;

    return (
      <div className="slide__buttons">
        <button className="slide__button" onClick={ this.props.onLeftButtonSelect }>{ leftButtonLabel }</button>
        <button className="slide__button" onClick={ this.props.onRightButtonSelect }>{ rightButtonLabel }</button>
      </div>
    );
  }
}

ScreenButtons.propTypes = {
  leftButtonLabel: React.PropTypes.string,
  rightButtonLabel: React.PropTypes.string,
  onLeftButtonSelect: React.PropTypes.func,
  onRightButtonSelect: React.PropTypes.func,
}

ScreenButtons.defaultProps = {
  leftButtonLabel: 'Left button',
  rightButtonLabel: 'Right button',
  onLeftButtonSelect: () => {},
  onRightButtonSelect: () => {},
}

export default ScreenButtons;
