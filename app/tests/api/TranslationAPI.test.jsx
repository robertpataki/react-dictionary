const expect = require('expect');

const TranslationAPI = require('TranslationAPI');

describe('TranslationAPI', () => {
  it('it should exist', () => {
    expect(TranslationAPI).toExist();
  });

  describe('setTranslations', () => {
    beforeEach(() => {
      localStorage.removeItem('translations');
    });

    it('should set valid translations array', () => {
      var translations = [{
        id: 23,
        text: 'test all files'
      }];

      TranslationAPI.setTranslations(translations);

      var actualTranslations = JSON.parse(localStorage.getItem('translations'));

      expect(actualTranslations).toEqual(translations);
    });

    it('should not set invalid translations array', () => {
      TranslationAPI.setTranslations();
      var actualTranslations = JSON.parse(localStorage.getItem('translations'));
      expect(actualTranslations).toBe(null);

      TranslationAPI.setTranslations('');
      var actualTranslations = JSON.parse(localStorage.getItem('translations'));
      expect(actualTranslations).toBe(null);

      TranslationAPI.setTranslations({a: 'b'});
      var actualTranslations = JSON.parse(localStorage.getItem('translations'));
      expect(actualTranslations).toBe(null);
    });
  });

  describe('getTranslations', () => {
    it('should return empty array for bad localstorage data', () => {
      var actualTranslations = TranslationAPI.getTranslations();
      expect(actualTranslations).toEqual([]);
    });

    it('should return array if valid array in localstorage', () => {
      var translations = [{
        id: 23,
        text: 'test all files'
      }];

      localStorage.setItem('translations', JSON.stringify(translations));

      var actualTranslations = JSON.parse(localStorage.getItem('translations'));
      expect(actualTranslations).toEqual(translations);
    });
  });

  describe('filterTranslations', () => {
    var translations = [{
      id: 1,
      text: 'Some text here'
    }, {
      id: 2,
      text: 'Some more text here'
    }, {
      id: 3,
      text: 'Even more text here'
    }];

    // Filter by search keyword
    it('should return every translation item if the search keyword is an empty string', () => {
      var filteredTranslations = TranslationAPI.filterTranslations(translations, '');
      expect(filteredTranslations.length).toBe(3);
    });

    it('should return every translation item if the search keyword is a valid string', () => {
      var filteredTranslations = TranslationAPI.filterTranslations(translations, 'some');
      expect(filteredTranslations.length).toBe(2);
    });
  });
});
