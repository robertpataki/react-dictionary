import React from 'react';
import { connect } from 'react-redux';

import * as actions from 'actions';
import * as screenTypes from 'screenTypes';

import TranslationInputSlide from 'TranslationInputSlide';
import { COPY_DOC } from 'copyDoc';

const SLIDES = {
  SLIDE_1: 'EXPRESSION_SLIDE',
  SLIDE_2: 'MEANING_SLIDE',
  SLIDE_3: 'PROCESSING_SLIDE'
};

export class EditScreen extends React.Component {
  constructor(props) {
    super(props);

    const { translation } = props;

    // Initial state
    this.state = {
      currentSlide: SLIDES.SLIDE_1,
      defaultExpression: translation.expression,
      editedExpression: translation.expression,
      defaultMeaning: translation.meaning,
      editedMeaning: translation.meaning,
      copy: COPY_DOC.en.editScreen.slides,
    };

    // Mouse events
    this.onExpressionNextButtonSelect = this.onExpressionNextButtonSelect.bind(this);
    this.onExpressionCancelButtonSelect = this.onExpressionCancelButtonSelect.bind(this);
    this.onExpressionChange = this.onExpressionChange.bind(this);
    this.onMeaningDoneButtonSelect = this.onMeaningDoneButtonSelect.bind(this);
    this.onMeaningBackButtonSelect = this.onMeaningBackButtonSelect.bind(this);
    this.onMeaningChange = this.onMeaningChange.bind(this);

    this.closeScreen = this.closeScreen.bind(this);
  }

  onExpressionChange(expression) {
    this.setState({
      editedExpression: expression
    });
  }
  onExpressionCancelButtonSelect() {
    const { dispatch } = this.props;
    dispatch(actions.setScreenType(screenTypes.DICTIONARY_SCREEN));
  }
  onExpressionNextButtonSelect() {
    this.setState({
      currentSlide: SLIDES.SLIDE_2,
    });
  }

  onMeaningChange(meaning) {
    this.setState({
      editedMeaning: meaning
    });
  }
  onMeaningBackButtonSelect() {
    this.setState({
      currentSlide: SLIDES.SLIDE_1,
    });
  }
  onMeaningDoneButtonSelect() {
    this.setState({
      currentSlide: SLIDES.SLIDE_3,
    });

    const { editedExpression, editedMeaning } = this.state;
    const { dispatch, translation } = this.props;

    dispatch(actions.startEditTranslation(translation.id, editedExpression, editedMeaning)).then((result) => {
      this.setState({
        currentSlide: SLIDES.SLIDE_4
      });
    })
  }

  closeScreen() {
    const { dispatch } = this.props;
    dispatch(actions.setScreenType(screenTypes.DICTIONARY_SCREEN));
  }

  renderSlides() {
    const { copy, currentSlide, editedMeaning, editedExpression } = this.state;
    const { translation } = this.props;

    switch (currentSlide) {
      case SLIDES.SLIDE_4:
        setTimeout(function() {
          this.closeScreen();
        }.bind(this), 1000);

        return(
          <div className="slide">
            <div className="slide__contents">
              <img src="/images/tick.svg" width="40px" />
            </div>
          </div>
        );
      case SLIDES.SLIDE_3:
        return(
          <div className="slide">
            <div className="slide__contents">
              <img src="/images/clock.svg" width="48px" />
            </div>
          </div>
        );
      case SLIDES.SLIDE_2:
        return (
          <TranslationInputSlide title={ copy.meaning.title } inputValue={ editedMeaning } leftButtonLabel={ copy.meaning.leftButton } rightButtonLabel={ copy.meaning.rightButton } onLeftButtonSelect={ this.onMeaningBackButtonSelect } onRightButtonSelect={ this.onMeaningDoneButtonSelect } onChange={ this.onMeaningChange } />
        );
      case SLIDES.SLIDE_1:
      default:
        return (
          <TranslationInputSlide title={ copy.expression.title } inputValue={ editedExpression } leftButtonLabel={ copy.expression.leftButton } rightButtonLabel={ copy.expression.rightButton } onLeftButtonSelect={ this.onExpressionCancelButtonSelect } onRightButtonSelect={ this.onExpressionNextButtonSelect } onChange={ this.onExpressionChange } />
        );
    }
  }

  render() {
    const { bgColor } = this.props;

    return (
      <div className="screen" style={{ background: bgColor }}>
        { this.renderSlides() }
      </div>
    );
  }
}

EditScreen.defaultProps = {
  bgColor: '#000',
  translation: {
    id: '123abc',
    expression: 'picsába',
    meaning: 'peach alba',
    createdAt: 100,
  },
}

EditScreen.propTypes = {
  bgColor: React.PropTypes.string,
  translation: React.PropTypes.object,
}

export default connect((state) => state)(EditScreen)
