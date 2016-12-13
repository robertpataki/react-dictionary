import React from 'react';
import { connect } from 'react-redux';

import AppHeader from 'AppHeader';
import Dictionary from 'Dictionary';
import EditScreen from 'EditScreen';
import CreateScreen from 'CreateScreen';
import TranslationAPI from 'TranslationAPI';

import * as actions from 'actions';
import * as screenTypes from 'screenTypes';

export class DictionaryApp extends React.Component {
  constructor(props) {
    super(props);

    this.renderScreen = this.renderScreen.bind(this);
    this.onAddButtonSelect = this.onAddButtonSelect.bind(this);
  }

  onAddButtonSelect(e) {
    e.preventDefault();

    const { dispatch } = this.props;
    dispatch(actions.setScreenType(screenTypes.CREATE_TRANSLATION_SCREEN));
  }

  renderScreen() {
    const { screenType, translations, searchText } = this.props;
    let filteredTranslations = TranslationAPI.filterTranslations(translations, searchText);

    // Descending sorting
    if (filteredTranslations) {
      filteredTranslations.sort((a, b) => b.createdAt - a.createdAt);
    }

    const screenOptions = screenType.options;
    const editableTranslation = TranslationAPI.findTranslationById(translations, screenOptions);

    switch (screenType.type) {
      case screenTypes.CREATE_TRANSLATION_SCREEN:
        return (
          <CreateScreen bgColor="#ABD30C" />
        );
      case screenTypes.EDIT_TRANSLATION_SCREEN:
        return (
          <EditScreen bgColor="#0074A6" translation={ editableTranslation }/>
        );
      case screenTypes.DICTIONARY_SCREEN:
      default:
        return (
          <Dictionary filteredTranslations={ filteredTranslations } />
        );
    }
  }

  render() {
    return (
      <section className="l-page">
        <AppHeader />

        { this.renderScreen() }

        <button className="add-button" ref={(ref) => {
          this.addButton=ref;
        }} onClick={ this.onAddButtonSelect }></button>
      </section>
    );
  }
}

export default connect((state) => state)(DictionaryApp);
