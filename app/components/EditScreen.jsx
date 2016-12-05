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

    // Initial state
    this.state = {
      currentSlide: SLIDES.SLIDE_1,
    };

    // Mouse events
    this.onExpressionNextButtonSelect = this.onExpressionNextButtonSelect.bind(this);
    this.onExpressionCancelButtonSelect = this.onExpressionCancelButtonSelect.bind(this);
    this.onMeaningDoneButtonSelect = this.onMeaningDoneButtonSelect.bind(this);
    this.onMeaningBackButtonSelect = this.onMeaningBackButtonSelect.bind(this);
  }

  onExpressionNextButtonSelect() {
    this.setState({
      currentSlide: SLIDES.SLIDE_2,
    });
  }

  onExpressionCancelButtonSelect() {
    const { dispatch } = this.props;
    dispatch(actions.setScreenType(screenTypes.DICTIONARY_SCREEN));
  }

  onMeaningDoneButtonSelect() {
    this.setState({
      currentSlide: SLIDES.SLIDE_3,
    });
  }

  onMeaningBackButtonSelect() {
    this.setState({
      currentSlide: SLIDES.SLIDE_1,
    });
  }

  renderSlides() {
    const { currentSlide } = this.state;
    const { translation } = this.props;

    switch (currentSlide) {
      case SLIDES.SLIDE_3:
        return(
          <div>PROCESSING...</div>
        );
      case SLIDES.SLIDE_2:
        return (
          <TranslationInputSlide title="Mit jelent?" inputValue={ translation.meaning } leftButtonLabel="Vissza" rightButtonLabel="Tovább" onLeftButtonSelect={ this.onMeaningBackButtonSelect } onRightButtonSelect={ this.onMeaningDoneButtonSelect } />
        );
        break;
      case SLIDES.SLIDE_1:
      default:
        return (
          <TranslationInputSlide title="Mi a szó - kifejezés?" inputValue={ translation.expression } leftButtonLabel="Mégse" rightButtonLabel="Tovább" onLeftButtonSelect={ this.onExpressionCancelButtonSelect } onRightButtonSelect={ this.onExpressionNextButtonSelect } />
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
