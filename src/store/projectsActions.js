export const createProject = (data) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const author = getState().firebase.auth.uid;
  const ref = firestore.collection('projects');
  ref.add({
    ...data, author: author, date: new Date(),
  }).then((resp) => {
    const extension = ref.doc(resp.id).collection('extensions');
    extension.doc('tasks').set({ list: [] });
    extension.doc('chats').set({ list: [] });
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

export const updateTasks = (data, project) => (dispatch, gs, { getFirestore }) => {
  const firestore = getFirestore();
  const ref = firestore.collection('projects').doc(project).collection('extensions');
  ref.doc('tasks').update({
    ...data,
  }).then(() => {
    dispatch({ type: 'UPDATETASKS_SUCCESS', data });
  }).catch((err) => {
    dispatch({ type: 'UPDATETASKS_ERROR', err });
  })
};

export const updateChats = (data, project) => (dispatch, gs, { getFirestore }) => {
  const firestore = getFirestore();
  const ref = firestore.collection('projects').doc(project).collection('extensions');
  ref.doc('chats').update({
    ...data,
  }).then(() => {
    dispatch({ type: 'UPDATECHATS_SUCCESS', data });
  }).catch((err) => {
    dispatch({ type: 'UPDATECHATS_ERROR', err });
  })
};
