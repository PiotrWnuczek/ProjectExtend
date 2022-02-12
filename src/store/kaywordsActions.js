export const createKeyword = (data) => (dispatch, gs, { getFirestore }) => {
  const firestore = getFirestore();
  const ref = firestore.collection('keywords');
  ref.add({
    ...data,
  }).then((resp) => {
    dispatch({ type: 'CREATEKEYWORD_SUCCESS', data, resp });
  }).catch((err) => {
    dispatch({ type: 'CREATEKEYWORD_ERROR', err });
  })
};

export const updateKeyword = (data, id) => (dispatch, gs, { getFirestore }) => {
  const firestore = getFirestore();
  const ref = firestore.collection('keywords');
  ref.doc(id).update({
    ...data,
  }).then(() => {
    dispatch({ type: 'UPDATEKEYWORD_SUCCESS', data });
  }).catch((err) => {
    dispatch({ type: 'UPDATEKEYWORD_ERROR', err });
  })
};

export const removeKeyword = (id) => (dispatch, gs, { getFirestore }) => {
  const firestore = getFirestore();
  const ref = firestore.collection('keywords');
  ref.doc(id).delete().then(() => {
    dispatch({ type: 'REMOVEKEYWORD_SUCCESS', id });
  }).catch((err) => {
    dispatch({ type: 'REMOVEKEYWORD_SUCCESS', err });
  })
};
