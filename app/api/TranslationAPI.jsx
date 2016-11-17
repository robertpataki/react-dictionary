const $ = require('jQuery');

module.exports = {
  setTranslations: function(translations) {
    if($.isArray(translations)) {
      localStorage.setItem('translations', JSON.stringify(translations));
      return translations;
    }
  },

  getTranslations: function() {
    var stringTranslations = localStorage.getItem('translations');
    var translations = [];

    try {
      translations = JSON.parse(stringTranslations);
    } catch(e) {
      console.error('Something is wrong with the data restored from localStorage')
    }

    return $.isArray(translations) ? translations : [];
  },

  filterTranslations: function (translations, searchText) {
    var filteredTranslations = translations;
    searchText = searchText.toLowerCase();

    // Filter by searchText
    filteredTranslations = filteredTranslations.filter((translation) => {
      var expression = translation.expression.toLowerCase();
      var meaning = translation.meaning.toLowerCase();

      var expressionResults = expression.indexOf(searchText) >= 0;
      var meaningResults = meaning.indexOf(searchText) >= 0;

      return searchText.length === 0 || expressionResults || meaningResults;
    });

    return filteredTranslations;
  }
};
