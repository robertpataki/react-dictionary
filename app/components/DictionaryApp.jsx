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
        <h1 className="page-title">Dictionary App</h1>

        <div className="row">
          <div className="columns small-centered small-11 medium-6 large-4">
            <div className="container">
              <TranslationSearch/>
              <TranslationList/>
              <AddTranslation/>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = DictionaryApp;
