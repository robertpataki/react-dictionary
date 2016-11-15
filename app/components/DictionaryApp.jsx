const React = require('react');
const uuid = require('node-uuid');
const moment = require('moment');

import TranslationList from 'TranslationList';
import AddTranslation from 'AddTranslation';
import TranslationSearch from 'TranslationSearch';

var DictionaryApp = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="columns small-centered small-12 medium-12 large-12">
          <div className="container">
            <TranslationSearch/>
            <TranslationList/>
            <AddTranslation/>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = DictionaryApp;
