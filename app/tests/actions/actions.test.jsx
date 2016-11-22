import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import firebase, {firebaseRef} from 'app/firebase';
import * as actions from 'actions';
import * as actionTypes from 'actionTypes';

const createMockStore = configureMockStore([thunk]);

describe('Actions', () => {
  describe('Translations', () => {
    it('should generate search text action', () => {
      const action = {
        type: actionTypes.SET_SEARCH_TEXT,
        searchText: 'Some search text',
      };

      const response = actions.setSearchText(action.searchText);
      expect(response).toEqual(action);
    });

    it('should generate add translation action', () => {
      const action = {
        type: actionTypes.ADD_TRANSLATION,
        translation: {
          id: 'abc123',
          expression: 'Egy kis tennivaló',
          meaning: 'Something to do',
          createdAt: 100,
        }
      };

      const response = actions.addTranslation(action.translation);
      expect(response).toEqual(action);
    });

    it('should generate add translations action', () => {
      const action = {
        type: actionTypes.ADD_TRANSLATIONS,
        translations: [
          { id: 1, expression: 'kutya', meaning: 'dog', createdAt: 100, },
          { id: 2, expression: 'macska', meaning: 'cat', createdAt: 200, }
        ]
      };

      const response = actions.addTranslations(action.translations);
      expect(response).toEqual(action);
    });

    it('should generate update translation action', () => {
      const action = {
        type: actionTypes.UPDATE_TRANSLATION,
        id: '123abc',
        updates: {
          expression: 'blah'
        }
      };

      const response = actions.updateTranslation(action.id, action.updates);
      expect(response).toEqual(action);
    });

    it('should generate a delete translation action', () => {
      const translation = {
        id: '123abc',
        expression: 'viszlát',
        meaning: 'bye',
        createdAt: 100,
      };

      const action = {
        type: actionTypes.DELETE_TRANSLATION,
        id: translation.id,
      };

      const response = actions.deleteTranslation(translation.id);
      expect(response).toEqual(action);
    });


    describe('Tests with Firebase translations', () => {
      let testTranslationRef;
      let uid;
      let translationsRef;

      beforeEach((done) => {
        firebase.auth().signInAnonymously().then((user) => {
          uid = user.uid,
          translationsRef = firebaseRef.child(`users/${uid}/translations`);

          return translationsRef.remove();
        }).then(() => {
          testTranslationRef = translationsRef.push();

          return testTranslationRef.set({
            expression: 'forrás kód',
            meaning: 'source code',
            createdAt: '1234',
          })
          .then(() => done())
          .catch(done);
        });
      });

      afterEach((done) => {
        translationsRef.remove().then(() => done());
      });

      it('should populate translations and dispatch ADD_TRANSLATIONS', (done) => {
        const store = createMockStore({ auth: { uid } });
        const action = actions.startAddTranslations();

        store.dispatch(action).then(() => {
          const mockActions = store.getActions();
          expect(mockActions[0].type).toEqual(actionTypes.ADD_TRANSLATIONS);
          expect(mockActions[0].translations.length).toEqual(1);
          expect(mockActions[0].translations[0].expression).toEqual('forrás kód');
          expect(mockActions[0].translations[0].meaning).toEqual('source code');

          done();
        }, done)
      });

      it('should create translation and dispatch ADD_TRANSLATION', (done) => {
        const store = createMockStore({ auth: { uid } });
        const expression = 'valami';
        const meaning = 'something';

        store.dispatch(actions.startAddTranslation(expression, meaning)).then(() => {
          const actions = store.getActions();
          const firstAction = actions[0];
          expect(firstAction).toInclude({
            type: actionTypes.ADD_TRANSLATION,
          });

          expect(firstAction).toInclude({
            translation: {
              expression,
              meaning,
            }
          });

          done();
        }).catch(done);
      });
    });

    describe('Authentication', () => {
      it('should generate login action', () => {
        const action = {
          type: actionTypes.LOGIN,
          uid: '123456',
          name: 'Anonymous Whoever',
          pic: 'http://placekitten.com/200/300'
        };
        const response = actions.login(action.uid, action.name, action.pic);

        expect(response).toEqual(action);
      });

      it('should generate logout action', () => {
        const action = {
          type: actionTypes.LOGOUT
        };
        const response = actions.logout();

        expect(response).toEqual(action);
      });
    });
  });
});
