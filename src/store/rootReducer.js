import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import profileReducer from 'store/profileReducer';

const rootReducer = combineReducers({
  profile: profileReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

export default rootReducer;
