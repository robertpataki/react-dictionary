import React from 'react';

export class SlideButtons extends React.Component {
  render() {
    const { leftButtonLabel,
            rightButtonLabel,
            onLeftButtonSelect,
            onRightButtonSelect,
            leftButtonDisabled,
            rightButtonDisabled } = this.props;

    return (
      <div className="slide__buttons">
        <button className="slide__button" onClick={ this.props.onLeftButtonSelect }
          disabled={ leftButtonDisabled }>{ leftButtonLabel }</button>
        <button className="slide__button" onClick={ this.props.onRightButtonSelect }
          disabled={ rightButtonDisabled }>{ rightButtonLabel }</button>
      </div>
    );
  }
}

SlideButtons.propTypes = {
  leftButtonLabel: React.PropTypes.string,
  rightButtonLabel: React.PropTypes.string,
  onLeftButtonSelect: React.PropTypes.func,
  onRightButtonSelect: React.PropTypes.func,
  leftButtonDisabled: React.PropTypes.bool,
  rightButtonDisabled: React.PropTypes.bool,
}

SlideButtons.defaultProps = {
  leftButtonLabel: 'Left button',
  rightButtonLabel: 'Right button',
  onLeftButtonSelect: () => {},
  onRightButtonSelect: () => {},
  leftButtonDisabled: false,
  rightButtonDisabled: false,
}

export default SlideButtons;
