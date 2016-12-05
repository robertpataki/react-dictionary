import React from 'react';
import { connect } from 'react-redux';

export class TranslationInputSlide extends React.Component {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {};

    this.handleLeftButtonSelect = this.handleLeftButtonSelect.bind(this);
    this.handleRightButtonSelect = this.handleRightButtonSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /* Lifecycle methods */
  componentDidMount() {
    const lastCharPos = this.input.value.length;
    this.input.focus();
    this.input.setSelectionRange(lastCharPos, lastCharPos);
  }

  componentWillUnmount() {
    const { inputValue } = this.props;
    console.log('[TranslationInputSlide] - componentWillUnmount() - inputValue: ', inputValue);
  }

  /* User events */
  handleLeftButtonSelect() {
    this.props.onLeftButtonSelect();
  }

  handleRightButtonSelect() {
    this.props.onRightButtonSelect();
  }

  handleChange() {

  }

  /* Render */
  render() {
    const { title, inputValue, leftButtonLabel, rightButtonLabel } = this.props;

    return (
      <div className="slide">
        <h3 className="slide__title">{ title }</h3>

        <div className="slide__contents">
          <input type="text" className="slide__input" ref={(ref) => {
              this.input = ref;
            }} defaultValue={ inputValue } value={ inputValue } onChange={ this.handleChange } />
        </div>

        <div className="slide__buttons">
          <button className="slide__button" onClick={ this.handleLeftButtonSelect }>{ leftButtonLabel }</button>
          <button className="slide__button" onClick={ this.handleRightButtonSelect }>{ rightButtonLabel }</button>
        </div>
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
  title: 'Default title',
  inputValue: 'Default input value',
  leftButtonLabel: 'Left button',
  rightButtonLabel: 'Right button',
  onLeftButtonSelect: () => {},
  onRightButtonSelect: () => {},
}

export default connect((state) => state)(TranslationInputSlide);
