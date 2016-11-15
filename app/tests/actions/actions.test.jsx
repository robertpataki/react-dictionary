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
      text: 'Something to do'
    };

    var response = actions.AddTranslation(action.text);
    expect(response).toEqual(action);
  });

  it('should generate add translations action', () => {
    var action = {
      type: 'ADD_TRANSLATIONS',
      translations: [
        {id: 1, text: 'Blah', createdAt: 100, completed: false, completedAt: undefined},
        {id: 2, text: 'Meh', createdAt: 200, completed: true, completedAt: 400}
      ]
    };

    var response = actions.AddTranslations(action.translations);
    expect(response).toEqual(action);
  });
});
