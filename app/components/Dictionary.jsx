import React from 'react';
import { connect } from 'react-redux';

import Translation from 'Translation';
import TranslationAPI from 'TranslationAPI';

export class Dictionary extends React.Component {
  render() {
    const { translations, searchText } = this.props;

    const renderTranslations = () => {
      const filteredTranslations = TranslationAPI.filterTranslations(translations, searchText);

      if (filteredTranslations.length === 0) {
        return (
          <p className="container__message">(◕⌓◕;) You haven't added any translations yet</p>
        )
      }

      return filteredTranslations.map((translation) => {
        return (
          <Translation key={ translation.id } { ...translation } />
        );
      });
    };

    return (
      <div className="row expanded">
        <h3 className="container__title">Dictionary</h3>
        <div className={ !translations.length ? "translations translations--empty" : "translations" }>
          { renderTranslations() }
        </div>
      </div>
    );
  }
}

Dictionary.propTypes = {
  translations: React.PropTypes.array.isRequired,
}

export default connect(
  (state) => {
    return state
  }
)(Dictionary);
