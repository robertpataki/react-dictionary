const React = require('react');
const uuid = require('node-uuid');
const moment = require('moment');

import TranslationList from 'TranslationList';
import AddTranslation from 'AddTranslation';
import TranslationSearch from 'TranslationSearch';

var DictionaryApp = React.createClass({
  render: function() {
    return (
      <div>
        <TranslationSearch/>
        <TranslationList/>
        <AddTranslation/>
      </div>
    );
  }
});

module.exports = DictionaryApp;
