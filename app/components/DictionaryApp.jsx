import React from 'react';
import { connect } from 'react-redux';

import AppHeader from 'AppHeader';
import Dictionary from 'Dictionary';
import AddTranslation from 'AddTranslation';
import EditScreen from 'EditScreen';

import * as screenTypes from 'screenTypes';

export class DictionaryApp extends React.Component {
  constructor(props) {
    super(props);

    this.renderScreen = this.renderScreen.bind(this);
  }

  renderScreen() {
    const { screenType } = this.props;

    switch (screenType) {
      case screenTypes.EDIT_TRANSLATION_SCREEN:
        return (
          <EditScreen bgColor="#0074A6" />
        );
      case screenTypes.DICTIONARY_SCREEN:
      default:
        return (
          <Dictionary />
        );
    }
  }

  render() {
    return (
      <section className="l-page">
        <AppHeader />

        <div>
          { this.renderScreen() }

          <AddTranslation />
        </div>
      </section>
    );
  }
}

export default connect((state) => state)(DictionaryApp);
