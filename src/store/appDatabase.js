import firebase from 'firebase/compat/app';
import 'firebase/compat/analytics';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

firebase.initializeApp({
  apiKey: 'AIzaSyD7L2QpxWZ1Wy5LvrXx_fHzyPVhTc0AP4U',
  authDomain: 'projectextend-com.firebaseapp.com',
  projectId: 'projectextend-com',
  storageBucket: 'projectextend-com.appspot.com',
  messagingSenderId: '904709273754',
  appId: '1:904709273754:web:83612ccd6526fa37470723',
  measurementId: 'G-FBWWMF3PQ9',
});

firebase.analytics();
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
