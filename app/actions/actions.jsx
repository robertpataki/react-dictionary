export var setSearchText = (searchText) => {
  return {
    type: 'SET_SEARCH_TEXT',
    searchText
  };
};

export var AddTranslation = (text) => {
  return {
    type: 'ADD_TRANSLATION',
    text
  };
};

export var AddTranslations = (translations) => {
  return {
    type: 'ADD_TRANSLATIONS',
    translations
  };
};
