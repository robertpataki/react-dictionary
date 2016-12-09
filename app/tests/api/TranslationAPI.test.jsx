import expect from 'expect';
import TranslationAPI from 'TranslationAPI';

describe('TranslationAPI', () => {
  it('it should exist', () => {
    expect(TranslationAPI).toExist();
  });

  describe('filterTranslations', () => {
    const translations = [{
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
      const filteredTranslations = TranslationAPI.filterTranslations(translations, '');
      expect(filteredTranslations.length).toBe(3);
    });

    it('should return every translation item if the search keyword is a valid string', () => {
      const filteredTranslations = TranslationAPI.filterTranslations(translations, 'ma');
      expect(filteredTranslations.length).toBe(2);
    });
  });

  describe('findTranslationById', () => {
    const translations = [{
      id: '1-1',
      expression: 'akármi',
      meaning: 'anything'
    }, {
      id: '2-2',
      expression: 'macska',
      meaning: 'cat'
    }];

    it('should return the translation matching the id', () => {
      const result = TranslationAPI.findTranslationById(translations, '2-2');
      expect(result).toEqual(translations[1]);
    });

    it('should return undefined if there is no match with id', () => {
      const result = TranslationAPI.findTranslationById(translations, '?');
      expect(result).toEqual(undefined);
    });

    it('should return undefined if no id and/or translations were passed in', () => {
      let result = TranslationAPI.findTranslationById(translations);
      expect(result).toEqual(undefined);

      result = TranslationAPI.findTranslationById(undefined, '2-2');
      expect(result).toEqual(undefined);

      result = TranslationAPI.findTranslationById(translations);
      expect(result).toEqual(undefined);
    });
  });
});
