import firebase from 'firebase/compat/app';
import 'firebase/compat/analytics';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

firebase.initializeApp({
  apiKey: 'AIzaSyBHAejQ6pDUGwi-6R7Nor7eMSJ5fTmQKhY',
  authDomain: 'projectextend-app.firebaseapp.com',
  projectId: 'projectextend-app',
  storageBucket: 'projectextend-app.appspot.com',
  messagingSenderId: '932989112054',
  appId: '1:932989112054:web:5498aea7e651c1a0e366d7',
});

firebase.analytics();
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
