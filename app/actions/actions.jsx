import moment from 'moment';

import * as actionTypes from 'actionTypes';

import firebase, { firebaseRef, facebookAuthProvider } from 'app/firebase';

///////////
//////// Translation Search
/////
export const setSearchText = (searchText) => {
  return {
    type: actionTypes.SET_SEARCH_TEXT,
    searchText,
  };
};

///////////
//////// Translation CRUD
/////
export const addTranslation = (translation) => {
  return {
    type: actionTypes.ADD_TRANSLATION,
    translation,
  };
};

export const startAddTranslation = (expression, meaning) => {
  return (dispatch, getState) => {
    const translation = {
      expression,
      meaning,
      createdAt: moment().unix(),
    }

    const uid = getState().auth.uid;
    const translationRef = firebaseRef.child(`users/${uid}/translations`).push(translation);

    return translationRef.then(() => {
      dispatch(addTranslation({
        ...translation,
        id: translationRef.key,
      }));
    })
  };
};

export const updateTranslation = (id, updates) => {
  return {
    type: actionTypes.UPDATE_TRANSLATION,
    id,
    updates
  };
};

// Remove translation
export const deleteTranslation = (id) => {
  return {
    type: actionTypes.DELETE_TRANSLATION,
    id,
  };
};

export const startDeleteTranslation = (id) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const translationsRef = firebaseRef.child(`users/${uid}/translations/${id}`);

    return translationsRef.remove().then((snapshot) => {
      dispatch(deleteTranslation(id));
    });
  };
};

///////////
//////// Translations
/////
export const addTranslations = (translations) => {
  return {
    type: actionTypes.ADD_TRANSLATIONS,
    translations,
  };
};

export const startAddTranslations = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const translationsRef = firebaseRef.child(`users/${uid}/translations`);

    return translationsRef.once('value').then((snapshot) => {
      const data = snapshot.val() || {};
      const translations = [];
      const keys = Object.keys(data);

      keys.forEach(function(key){
        translations.push({
          id: key,
          ...data[key],
        });
      });

      dispatch(addTranslations(translations));
    });
  };
};





///////////
//////// Authentication
/////

// Login
export const login = (uid, displayName, photoURL) => {
  return {
    type: actionTypes.LOGIN,
    uid,
    name: displayName,
    pic: photoURL,
  };
};
export const startLogin = () => {
  return (dispatch, getState) => {
  	return firebase.auth().signInWithPopup(facebookAuthProvider).then((result) => {
    }, (error) => {
      console.error('Unable to auth: ', error);
    });
  };
}

// Logout
export const logout = () => {
  return {
    type: actionTypes.LOGOUT
  };
};
export const startLogout = () => {
  return (dispatch, getState) => {
    return firebase.auth().signOut().then(() => {});
  };
}


///////////
//////// App Status
/////
export const setScreenType = (screenType, editableTranslationId) => {
  let response = {
    type: actionTypes.SET_SCREEN_TYPE,
    screenType: {
      type: screenType,
      options: {},
    }
  }

  if (typeof editableTranslationId !== 'undefined') {
    response.screenType.options.editableTranslationId = editableTranslationId;
  }

  return response;
};
