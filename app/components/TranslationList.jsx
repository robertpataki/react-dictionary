const React = require('react');
const {connect} = require('react-redux');

import Translation from 'Translation';
const TranslationAPI = require('TranslationAPI');

export var TranslationList = React.createClass({
  propTypes: function() {
    translations: React.PropTypes.array.isRequired
  },

  render: function() {
    var {translations, searchText} = this.props;

    var renderTranslations = () => {

      if(translations.length === 0) {
        return (
          <p className="container__message">No translations</p>
        )
      }

      return TranslationAPI.filterTranslations(translations, searchText).map((translation) => {
        return (
          <Translation key={translation.id} {...translation} />
        );
      });
    };

    return (
      <div className="row expanded">
        <div className={ !translations.length ? "translations translations--empty" : "translations" }>
          {renderTranslations()}
        </div>
      </div>
    );
  }
});

export default connect(
  (state) => {
    return state
  }
)(TranslationList);
