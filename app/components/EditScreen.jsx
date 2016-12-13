import React from 'react';
import { connect } from 'react-redux';

import * as actions from 'actions';
import TranslationSlidesScreen from 'TranslationSlidesScreen';

export class EditScreen extends TranslationSlidesScreen {
  constructor(props) {
    super(props);

    const { translation } = props;

    // Initial state
    this.state = {
      ...this.state,
      defaultExpression: translation.expression,
      editedExpression: translation.expression,
      defaultMeaning: translation.meaning,
      editedMeaning: translation.meaning,
    };
  }


  onMeaningDoneButtonSelect() {
    this.setState({
      currentSlide: TranslationSlidesScreen.SLIDES.SLIDE_3,
    });

    const { editedExpression, editedMeaning } = this.state;
    const { dispatch, translation } = this.props;

    dispatch(actions.startEditTranslation(translation.id, editedExpression, editedMeaning)).then((result) => {
      this.setState({
        currentSlide: TranslationSlidesScreen.SLIDES.SLIDE_4
      });
    })
  }
}

EditScreen.propTypes = {
  ...TranslationSlidesScreen.propTypes,
  translation: React.PropTypes.object,
}

export default connect((state) => state)(EditScreen)
