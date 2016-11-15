const moment = require('moment');
const uuid = require('node-uuid');

export var searchTextReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_SEARCH_TEXT':
      return action.searchText;
    default:
      return state;
  }
};

export var translationsReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TRANSLATION':
      return [
        ...state,
        {
          id: uuid.v4(),
          text: action.text,
          createdAt: moment().unix()
        }
      ];
      case 'ADD_TRANSLATIONS':
        return [
          ...state,
          ...action.translations
        ];
    default:
      return state;
  }
};
