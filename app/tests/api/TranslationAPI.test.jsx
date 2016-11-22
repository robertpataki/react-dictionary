import expect from 'expect';
import TranslationAPI from 'TranslationAPI';

describe('TranslationAPI', () => {
  it('it should exist', () => {
    expect(TranslationAPI).toExist();
  });

  describe('filterTranslations', () => {
    var translations = [{
      id: '1-1',
      expression: 'akármi',
      meaning: 'anything'
    }, {
      id: '2-2',
      expression: 'macska',
      meaning: 'cat'
    }, {
      id: '3-3',
      expression: 'madár',
      meaning: 'bird'
    }];

    // Filter by search keyword
    it('should return matching translation item if the search keyword is an empty string', () => {
      var filteredTranslations = TranslationAPI.filterTranslations(translations, '');
      expect(filteredTranslations.length).toBe(3);
    });

    it('should return every translation item if the search keyword is a valid string', () => {
      var filteredTranslations = TranslationAPI.filterTranslations(translations, 'ma');
      expect(filteredTranslations.length).toBe(2);
    });
  });
});
