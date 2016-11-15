const expect = require('expect');
const actions = require('actions');

describe('Actions', () => {
  it('should generate search text action', () => {
    var action = {
      type: 'SET_SEARCH_TEXT',
      searchText: 'Some search text'
    }

    var response = actions.setSearchText(action.searchText);
    expect(response).toEqual(action);
  });

  it('should generate add translation action', () => {
    var action = {
      type: 'ADD_TRANSLATION',
      expression: 'Valami',
      meaning: 'Something'
    };

    var response = actions.AddTranslation(action.expression, action.meaning);
    expect(response).toEqual(action);
  });

  it('should generate add translations action', () => {
    var action = {
      type: 'ADD_TRANSLATIONS',
      translations: [
        { id: 1, expression: 'puszi', meaning: 'kiss', createdAt: 100 },
        { id: 2, expression: 'csoda', meaning: 'expression', createdAt: 200 }
      ]
    };

    var response = actions.AddTranslations(action.translations);
    expect(response).toEqual(action);
  });
});
