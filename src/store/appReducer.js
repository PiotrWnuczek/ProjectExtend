import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import usersReducer from 'store/usersReducer';
import projectsReducer from 'store/projectsReducer';
import tagsReducer from 'store/tagsReducer';

const appReducer = combineReducers({
  users: usersReducer,
  projects: projectsReducer,
  tags: tagsReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

export default appReducer;
