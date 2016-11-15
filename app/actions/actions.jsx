export var setSearchText = (searchText) => {
  return {
    type: 'SET_SEARCH_TEXT',
    searchText
  };
};

export var AddTranslation = (expression, meaning) => {
  return {
    type: 'ADD_TRANSLATION',
    expression,
    meaning
  };
};

export var AddTranslations = (translations) => {
  return {
    type: 'ADD_TRANSLATIONS',
    translations
  };
};
