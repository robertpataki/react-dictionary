import React from 'react';

import SlideButtons from 'SlideButtons';

export class TranslationInputSlide extends React.Component {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      inputValue: props.inputValue
    };

    // Function binding
    this.init = this.init.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
  }

  /* Lifecycle methods */
  componentDidUpdate() {
    this.init();
  }
  componentDidMount() {
    this.init();
  }

  onChange(e) {
    const updatedInputValue = this.input.value;
    this.setState({
      updatedInputValue,
    });

    this.props.onChange(updatedInputValue);
  }

  onKeyUp(e) {
    switch (e.key) {
      case 'Enter':
        if (this.props.inputValue.length) {
          this.props.onRightButtonSelect();
        }
        break;
      case 'Escape':
        this.props.onLeftButtonSelect();
        break;
    }
  }

  init() {
    const lastCharPos = this.input.value.length;
    if (!lastCharPos) {
      this.input.focus();
      this.input.setSelectionRange(lastCharPos, lastCharPos);
    }
  }

  /* Render */
  render() {
    const { title, leftButtonLabel, rightButtonLabel, inputValue } = this.props;
    const rightButtonDisabled = Boolean(!inputValue.length);

    const slideButtonsSettings = {
      leftButtonLabel,
      rightButtonLabel,
      rightButtonDisabled,
      onLeftButtonSelect: this.props.onLeftButtonSelect,
      onRightButtonSelect: this.props.onRightButtonSelect,
    };

    return (
      <div className="slide" tabIndex="0" onKeyUp={ this.onKeyUp }>
        <h3 className="slide__title">{ title }</h3>

        <div className="slide__contents">
          <input type="text" className="slide__input" ref={(ref) => {
              this.input = ref;
            }} value={ inputValue } maxLength="128" onChange={ this.onChange } />
        </div>

        <SlideButtons { ...slideButtonsSettings } />
      </div>
    );
  }
}

TranslationInputSlide.propTypes = {
  title: React.PropTypes.string,
  inputValue: React.PropTypes.string,
  leftButtonLabel: React.PropTypes.string,
  rightButtonLabel: React.PropTypes.string,
  onLeftButtonSelect: React.PropTypes.func,
  onRightButtonSelect: React.PropTypes.func,
}

TranslationInputSlide.defaultProps = {
  title: 'Title',
  inputValue: '',
  leftButtonLabel: 'Left button',
  rightButtonLabel: 'Right button',
  onLeftButtonSelect: () => {},
  onRightButtonSelect: () => {},
}

export default TranslationInputSlide;
