export const signinUser = (creds) => (dispatch, gs, { getFirebase }) => {
  const firebase = getFirebase();
  firebase.auth().signInWithEmailAndPassword(
    creds.email, creds.password,
  ).then(() => {
    dispatch({ type: 'SIGNINUSER_SUCCESS' });
  }).catch((err) => {
    dispatch({ type: 'SIGNINUSER_ERROR', err });
  })
};

export const signupUser = (user) => (dispatch, gs, { getFirebase, getFirestore }) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  firebase.auth().createUserWithEmailAndPassword(
    user.email, user.password,
  ).then((resp) => (
    firestore.collection('users').doc(resp.user.uid).set({
      email: user.email, name: user.name,
    })
  )).then(() => {
    dispatch({ type: 'SIGNUPUSER_SUCCESS' });
  }).catch((err) => {
    dispatch({ type: 'SIGNUPUSER_ERROR', err });
  })
};

export const signoutUser = () => (dispatch, gs, { getFirebase }) => {
  const firebase = getFirebase();
  firebase.auth().signOut().then(() => {
    dispatch({ type: 'SIGNOUTUSER_SUCCESS' });
  })
};

export const updateProfile = (data) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const authorid = getState().firebase.auth.uid;
  const ref = firestore.collection('users').doc(authorid);
  ref.update({
    ...data,
  }).then(() => {
    dispatch({ type: 'UPDATEPROFILE_SUCCESS', data });
  }).catch((err) => {
    dispatch({ type: 'UPDATEPROFILE_ERROR', err });
  })
};
