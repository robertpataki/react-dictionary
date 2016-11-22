import $ from 'jquery';

module.exports = {
  filterTranslations: function (translations, searchText) {
    if(typeof searchText !== 'string') {
      return translations;
    }

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
