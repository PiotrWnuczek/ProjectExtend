export const createTag = (data) => (dispatch, gs, { getFirestore }) => {
  const firestore = getFirestore();
  const ref = firestore.collection('tags');
  ref.add({
    ...data,
  }).then((resp) => {
    dispatch({ type: 'CREATETAG_SUCCESS', data, resp });
  }).catch((err) => {
    dispatch({ type: 'CREATETAG_ERROR', err });
  })
};

export const updateTag = (data, id) => (dispatch, gs, { getFirestore }) => {
  const firestore = getFirestore();
  const ref = firestore.collection('tags');
  ref.doc(id).update({
    ...data,
  }).then(() => {
    dispatch({ type: 'UPDATETAG_SUCCESS', data });
  }).catch((err) => {
    dispatch({ type: 'UPDATETAG_ERROR', err });
  })
};

export const removeTag = (id) => (dispatch, gs, { getFirestore }) => {
  const firestore = getFirestore();
  const ref = firestore.collection('tags');
  ref.doc(id).delete().then(() => {
    dispatch({ type: 'REMOVETAG_SUCCESS', id });
  }).catch((err) => {
    dispatch({ type: 'REMOVETAG_SUCCESS', err });
  })
};
