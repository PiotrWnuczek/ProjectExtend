export const createProject = (data) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const author = getState().firebase.auth.uid;
  const ref = firestore.collection('projects');
  ref.add({
    ...data, author: author,
    name: '', description: '',
  }).then((resp) => {
    dispatch({ type: 'CREATEPROJECT_SUCCESS', data, resp });
  }).catch((err) => {
    dispatch({ type: 'CREATEPROJECT_ERROR', err });
  })
};

export const updateProject = (data, id) => (dispatch, gs, { getFirestore }) => {
  const firestore = getFirestore();
  const ref = firestore.collection('projects');
  ref.doc(id).update({
    ...data,
  }).then(() => {
    dispatch({ type: 'UPDATEPROJECT_SUCCESS', data });
  }).catch((err) => {
    dispatch({ type: 'UPDATEPROJECT_ERROR', err });
  })
};

export const removeProject = (id) => (dispatch, gs, { getFirestore }) => {
  const firestore = getFirestore();
  const ref = firestore.collection('projects');
  ref.doc(id).delete().then(() => {
    dispatch({ type: 'REMOVEPROJECT_SUCCESS', id });
  }).catch((err) => {
    dispatch({ type: 'REMOVEPROJECT_SUCCESS', err });
  })
};
