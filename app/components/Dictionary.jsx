import React from 'react';
import { connect } from 'react-redux';

import Translation from 'Translation';
import TranslationAPI from 'TranslationAPI';

export class Dictionary extends React.Component {
  render() {
    const { translations, searchText } = this.props;
    const filteredTranslations = TranslationAPI.filterTranslations(translations, searchText);

    const renderTranslations = () => {
      if (!translations.length) {
        return (
          <div className="container">
            <p className="container__message" data-message-type="no-translations">(◕⌓◕;) You haven't added any translations yet</p>
          </div>
        );
      } else if(!filteredTranslations.length) {
        return (
          <div className="container">
            <p className="container__message" data-message-type="no-search-results">(●´⌓`●) No such find</p>
          </div>
        );
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
        <div className={ !translations.length || !filteredTranslations.length ? "translations translations--with-message" : "translations" }>
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
