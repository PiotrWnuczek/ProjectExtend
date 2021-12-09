export const signIn = (creds) => (dispatch, gs, { getFirebase }) => {
  const firebase = getFirebase();
  firebase.auth().signInWithEmailAndPassword(
    creds.email, creds.password,
  ).then(() => {
    dispatch({ type: 'SIGNIN_SUCCESS' });
  }).catch((err) => {
    dispatch({ type: 'SIGNIN_ERROR', err });
  })
};

export const signOut = () => (dispatch, gs, { getFirebase }) => {
  const firebase = getFirebase();
  firebase.auth().signOut().then(() => {
    dispatch({ type: 'SIGNOUT_SUCCESS' });
  })
};

export const signUp = (user) => (dispatch, gs, { getFirebase, getFirestore }) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  firebase.auth().createUserWithEmailAndPassword(
    user.email, user.password,
  ).then((resp) => (
    firestore.collection('users').doc(resp.user.uid).set({
      email: user.email, name: user.name,
    })
  )).then(() => {
    dispatch({ type: 'SIGNUP_SUCCESS' });
  }).catch((err) => {
    dispatch({ type: 'SIGNUP_ERROR', err });
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

export const removeProfile = () => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const authorid = getState().firebase.auth.uid;
  const ref = firestore.collection('users').doc(authorid);
  ref.delete().then(() => {
    dispatch({ type: 'REMOVEPROFILE_SUCCESS' });
  })
};
