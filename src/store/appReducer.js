import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import usersReducer from 'store/usersReducer';
import projectsReducer from 'store/projectsReducer';
import keywordsReducer from 'store/keywordsReducer';

const appReducer = combineReducers({
  users: usersReducer,
  projects: projectsReducer,
  keywords: keywordsReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

export default appReducer;
