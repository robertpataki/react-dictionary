import React from 'react';
import { connect } from 'react-redux';

import * as actions from 'actions';
import TranslationSlidesScreen from 'TranslationSlidesScreen';

export class CreateScreen extends TranslationSlidesScreen {
  onMeaningDoneButtonSelect() {
    this.setState({
      currentSlide: TranslationSlidesScreen.SLIDES.SLIDE_3,
    });

    const { editedExpression, editedMeaning } = this.state;
    const { dispatch} = this.props;

    dispatch(actions.startAddTranslation(editedExpression, editedMeaning)).then((result) => {
      this.setState({
        currentSlide: TranslationSlidesScreen.SLIDES.SLIDE_4
      });
    })
  }
}

export default connect((state) => state)(CreateScreen)
