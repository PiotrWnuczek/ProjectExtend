export const createProject = (data) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const author = getState().firebase.auth.uid;
  const ref = firestore.collection('projects');
  ref.add({
    ...data, author: author, date: new Date(),
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

export const createTask = (data, project) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const author = getState().firebase.auth.uid;
  const ref = firestore.collection('projects').doc(project).collection('tasks');
  ref.add({
    ...data, author: author, date: new Date(),
  }).then((resp) => {
    dispatch({ type: 'CREATETASK_SUCCESS', data, resp });
  }).catch((err) => {
    dispatch({ type: 'CREATETASK_ERROR', err });
  })
};

export const updateTask = (data, id, project) => (dispatch, gs, { getFirestore }) => {
  const firestore = getFirestore();
  const ref = firestore.collection('projects').doc(project).collection('tasks');
  ref.doc(id).update({
    ...data,
  }).then(() => {
    dispatch({ type: 'UPDATETASK_SUCCESS', data });
  }).catch((err) => {
    dispatch({ type: 'UPDATETASK_ERROR', err });
  })
};

export const removeTask = (id, project) => (dispatch, gs, { getFirestore }) => {
  const firestore = getFirestore();
  const ref = firestore.collection('projects').doc(project).collection('tasks');
  ref.doc(id).delete().then(() => {
    dispatch({ type: 'REMOVETASK_SUCCESS', id });
  }).catch((err) => {
    dispatch({ type: 'REMOVETASK_SUCCESS', err });
  })
};
