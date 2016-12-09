module.exports = {
  filterTranslations: function (translations, searchText) {
    if(typeof searchText !== 'string') {
      return translations;
    }

    let filteredTranslations = translations;
    searchText = searchText.toLowerCase();

    // Filter by searchText
    filteredTranslations = filteredTranslations.filter((translation) => {
      const expression = translation.expression.toLowerCase();
      const meaning = translation.meaning.toLowerCase();

      const expressionResults = expression.indexOf(searchText) >= 0;
      const meaningResults = meaning.indexOf(searchText) >= 0;

      return searchText.length === 0 || expressionResults || meaningResults;
    });

    return filteredTranslations;
  }
};
