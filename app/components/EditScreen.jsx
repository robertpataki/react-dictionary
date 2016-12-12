import React from 'react';
import { connect } from 'react-redux';

// GSAP Animation imports
import { TimelineMax } from 'gsap';
import GSAP from 'react-gsap-enhancer';
import TransitionGroup from 'react-addons-transition-group';
import connectWithTransitionGroup from 'connect-with-transition-group';
// END OF GSAP Animation imports

import * as actions from 'actions';
import * as screenTypes from 'screenTypes';

// import ExpressionSlide from 'ExpressionSlide';
// import MeaningSlide from 'MeaningSlide';
import TranslationInputSlide from 'TranslationInputSlide';

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
    const { currentSlide, editedMeaning, editedExpression } = this.state;
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
          <TranslationInputSlide title="Mit jelent?" inputValue={ editedMeaning } leftButtonLabel="Vissza" rightButtonLabel="Tovább" onLeftButtonSelect={ this.onMeaningBackButtonSelect } onRightButtonSelect={ this.onMeaningDoneButtonSelect } onChange={ this.onMeaningChange } />
        );
      case SLIDES.SLIDE_1:
      default:
        return (
          <TranslationInputSlide title="Mi a szó - kifejezés?" inputValue={ editedExpression } leftButtonLabel="Mégse" rightButtonLabel="Tovább" onLeftButtonSelect={ this.onExpressionCancelButtonSelect } onRightButtonSelect={ this.onExpressionNextButtonSelect } onChange={ this.onExpressionChange } />
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

export default connectWithTransitionGroup(connect(
  (state) => state,
  null,
  null,
  // IMPORTANT: must pass this flag to react-redux/connect
  { withRef: true, }
)(GSAP()(EditScreen)));
