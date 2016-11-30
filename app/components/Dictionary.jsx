import React from 'react';
import { connect } from 'react-redux';
import TransitionGroup from 'react-addons-transition-group';

import Translation from 'Translation';
import TranslationAPI from 'TranslationAPI';

export class Dictionary extends React.Component {
  render() {
    const { translations, searchText } = this.props;
    const filteredTranslations = TranslationAPI.filterTranslations(translations, searchText);

    const renderTranslations = () => {
      if (!translations.length) {
        return (
          <p className="translations__message" data-message-type="no-translations">(●´⌓`●) You haven't added any translations yet</p>
        );
      } else if(!filteredTranslations.length) {
        return (
          <p className="translations__message" data-message-type="no-search-results">(ノಠ益ಠ)ノ彡┻━┻ No such find</p>
        );
      }

      return filteredTranslations.map((translation) => {
        return (
          <Translation key={ translation.id } { ...translation } />
        );
      });
    };

    return (
      <div className={ !translations.length || !filteredTranslations.length ? "translations translations--with-message" : "translations" }>
        <TransitionGroup>
          { renderTranslations() }
        </TransitionGroup>
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
