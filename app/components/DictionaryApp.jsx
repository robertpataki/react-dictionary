import React from 'react';
import { connect } from 'react-redux';

import AppHeader from 'AppHeader';
import Dictionary from 'Dictionary';
import AddTranslation from 'AddTranslation';

export class DictionaryApp extends React.Component {
  render() {
    return (
      <section className="l-page">
        <AppHeader />

        <div>
          <Dictionary />
          <AddTranslation />
        </div>
      </section>
    );
  }
}

export default connect()(DictionaryApp);
