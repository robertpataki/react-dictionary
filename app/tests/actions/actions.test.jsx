import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import firebase, {firebaseRef} from 'app/firebase';
import * as actions from 'actions';
import * as actionTypes from 'actionTypes';
import * as screenTypes from 'screenTypes';

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
      let translationCount;

      beforeEach((done) => {
        // First we login and remove all translations from the test db
        firebase.auth().signInAnonymously().then((user) => {
          uid = user.uid,
          translationsRef = firebaseRef.child(`users/${uid}/translations`);

          // Keep track of the number of translations added to the db
          translationsRef.on('value', (snapshot) => {
            translationCount = snapshot.numChildren();
          })

          return translationsRef.remove();
        }).then(() => {
          // Then we create a new translation in the db
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
        // When we're done we delete the test translation from the db
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

      it('should delete the selected translation and dispatch DELETE_TRANSLATION', (done) => {
        const store = createMockStore({ auth: { uid } });

        // First we create a new translation in the db
        const newTestTranslationRef = translationsRef.push();
        const newTestTranslationRefKey = newTestTranslationRef.key;

        newTestTranslationRef.set({
          expression: 'törölj le',
          meaning: 'delete me',
          createdAt: '1234',
        }).then(() => {
          //1) Confirm that there are now 2 items
          expect(translationCount).toEqual(2);

          //2) Delete the newest item
          store.dispatch(actions.startDeleteTranslation(newTestTranslationRefKey)).then(() => {
            const actions = store.getActions();
            const firstAction = actions[0];

            //3) Confirm that there is only 1 item, and the latest key doesn't exist anymore
            expect(translationCount).toEqual(1);
            expect(firstAction).toInclude({
              type: actionTypes.DELETE_TRANSLATION,
              id: newTestTranslationRefKey,
            });
            done();
          }).catch(done);
        });
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

    describe('Screen Type', () => {
      it('should generate setScreenType action for EDIT_TRANSLATION_SCREEN', () => {
        const action = {
          screenType: screenTypes.EDIT_TRANSLATION_SCREEN,
          type: actionTypes.SET_SCREEN_TYPE,
        };

        const response = actions.setScreenType(action.screenType);
        expect(response).toEqual(action);
      });
    });

    describe('Marking a translation for editing', () => {
      it('should generate markTranslationForEditing action', () => {
        const action = {
          translation: {
            id: '123abc',
            expression: 'editálj',
            meaning: 'edit me',
            createdAt: 1
          },
          type: actionTypes.MARK_TRANSLATION_FOR_EDITING,
        };

        const response = actions.markTranslationForEditing(action.translation.id);
        expect(response).toEqual(action);
      });
    });
  });
});
