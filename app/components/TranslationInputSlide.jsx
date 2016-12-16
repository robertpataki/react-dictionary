import React from 'react';
import { TransitionMotion, spring, presets } from 'react-motion';

import SlideButtons from 'SlideButtons';

export class TranslationInputSlide extends React.Component {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      inputValue: props.inputValue,
      items: [],
    };

    // Function binding
    this.initInput = this.initInput.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /* Lifecycle methods */
  componentDidUpdate() {
    // this.initInput();
  }
  componentDidMount() {
    // this.initInput();

    this.initAnimationSequence();
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

  initInput() {
    const lastCharPos = this.input.value.length;
    if (!lastCharPos) {
      this.input.focus();
      this.input.setSelectionRange(lastCharPos, lastCharPos);
    }
  }

  initAnimationSequence() {
    let counter = 0;
    const total = 4;

    const ticker = setInterval(() => {
      counter = counter < total - 1 ? ++counter : 0;

      let items = [];

      switch (counter) {
        case 1:
          items = [
            {key: 'trans0', opacity: 1},
            {key: 'trans1', opacity: 1},
            {key: 'trans2', opacity: 0},
          ];
          break;
        case 2:
          items = [
            {key: 'trans0', opacity: 1},
            {key: 'trans1', opacity: 1},
            {key: 'trans2', opacity: 1},
          ];
          break;
        case 3:
          items = [
            {key: 'trans0', opacity: 1},
            {key: 'trans1', opacity: 0},
            {key: 'trans2', opacity: 1},
          ];
          break;
      }

      this.setState({
        items,
      });
    }, 500);
  }

  willEnter() {
    return {
      opacity: 0,
    }
  }

  willLeave() {
    return {
      opacity: spring(0),
    }
  }

  findStylezByKey(ipStyles, key) {
    return ipStyles.find((o) => o.key === key);
  }

  getTrans0Stylez(ipStyles) {
    const stylez = this.findStylezByKey(ipStyles, 'trans0');
    if (!stylez) {
      return {}
    }

    console.log(stylez.style);

    return stylez.style;
  }

  renderTitle(ipStyles) {
    const { title } = this.props;
    const stylez = this.findStylezByKey(ipStyles, 'trans1');

    if (stylez) {
      return (
        <h3 key="trans1" className="slide__title" style={{ ...stylez.style }}>{ title }</h3>
      )
    } else {
      return false;
    }
  }

  renderContents(ipStyles) {
    const { inputValue } = this.props;
    const stylez = this.findStylezByKey(ipStyles, 'trans2');

    if (stylez) {
      return (
        <div key="trans2" className="slide__contents" style={{ ...stylez.style }}>
          <input type="text" className="slide__input" ref={(ref) => {
              this.input = ref;
            }} value={ inputValue } maxLength="128" onChange={ this.onChange } />
        </div>
      )
    } else {
      return false;
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
      <TransitionMotion
        willEnter={ this.willEnter }
        willLeave={ this.willLeave }
        defaultStyles={this.state.items.map(item => ({
          key: item.key,
          style: { opacity: 0 }
        }))}
        styles={this.state.items.map(item => ({
          key: item.key,
          style: { opacity: spring(item.opacity) }
        }))}>

        { ipStyles =>
          <div key="trans0" className="slide" tabIndex="0" onKeyUp={ this.onKeyUp } style={ this.getTrans0Stylez(ipStyles) }>
              { this.renderTitle(ipStyles) }

              { this.renderContents(ipStyles) }

              {/*
              {ipStyles.map(config => {
                return (
                  <div key={config.key} style={{...config.style, backgroundColor: 'black'}}><div className="label">{config.style.opacity}</div></div>
                );
              })}
              */}
          </div>
        }
      </TransitionMotion>
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
