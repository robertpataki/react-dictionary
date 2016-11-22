import React from 'react';
import { connect } from 'react-redux';

import UserBar from 'UserBar';
import TranslationSearch from 'TranslationSearch';
import Dictionary from 'Dictionary';
import AddTranslation from 'AddTranslation';

export class DictionaryApp extends React.Component {
  render() {
    return (
      <section>
        <UserBar />

        <div>
          <TranslationSearch />
          <Dictionary />
          <AddTranslation />
        </div>
      </section>
    );
  }
}

export default connect()(DictionaryApp);
