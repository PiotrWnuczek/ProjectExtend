export const createProject = (data) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const auth = getState().firebase.auth;
  const ref = firestore.collection('projects');
  ref.add({
    ...data, tags: [data.name], emails: [auth.email],
  }).then((resp) => {
    const content = ref.doc(resp.id).collection('content');
    content.doc('team').set({ members: [auth.email], candidates: [] });
    content.doc('tasks').set({ todo: [], done: [] });
    content.doc('chats').set({ threads: [] });
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
  const tasks = getState().firestore.data.tasks;
  const id = Math.random().toString(16).slice(2);
  const ref = firestore.collection('projects').doc(project).collection('content');
  ref.doc('tasks').update({
    todo: [{ id, ...data }, ...tasks.todo],
  }).then(() => {
    dispatch({ type: 'UPDATETASKS_SUCCESS', data });
  }).catch((err) => {
    dispatch({ type: 'UPDATETASKS_ERROR', err });
  })
};

export const updateTask = (data, id, project) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const tasks = getState().firestore.data.tasks;
  const ref = firestore.collection('projects').doc(project).collection('content');
  ref.doc('tasks').update({
    todo: tasks.todo.map(task => task.id === id ? { ...task, ...data } : task),
    done: tasks.done.map(task => task.id === id ? { ...task, ...data } : task),
  }).then(() => {
    dispatch({ type: 'UPDATETASKS_SUCCESS', data });
  }).catch((err) => {
    dispatch({ type: 'UPDATETASKS_ERROR', err });
  })
};

export const removeTask = (id, project) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const tasks = getState().firestore.data.tasks;
  const ref = firestore.collection('projects').doc(project).collection('content');
  ref.doc('tasks').update({
    todo: tasks.todo.filter(task => task.id !== id),
    done: tasks.done.filter(task => task.id !== id),
  }).then(() => {
    dispatch({ type: 'UPDATETASKS_SUCCESS', id });
  }).catch((err) => {
    dispatch({ type: 'UPDATETASKS_ERROR', err });
  })
};

export const updateTasks = (data, project) => (dispatch, gs, { getFirestore }) => {
  const firestore = getFirestore();
  const ref = firestore.collection('projects').doc(project).collection('content');
  ref.doc('tasks').update({
    ...data,
  }).then(() => {
    dispatch({ type: 'UPDATETASKS_SUCCESS', data });
  }).catch((err) => {
    dispatch({ type: 'UPDATETASKS_ERROR', err });
  })
};

export const createChat = (data, project) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const chats = getState().firestore.data.chats;
  const id = Math.random().toString(16).slice(2);
  const ref = firestore.collection('projects').doc(project).collection('content');
  ref.doc('chats').update({
    threads: [{ id, ...data }, ...chats.threads],
  }).then(() => {
    dispatch({ type: 'UPDATECHATS_SUCCESS', data });
  }).catch((err) => {
    dispatch({ type: 'UPDATECHATS_ERROR', err });
  })
};

export const updateChat = (data, id, project) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const chats = getState().firestore.data.chats;
  const ref = firestore.collection('projects').doc(project).collection('content');
  ref.doc('chats').update({
    threads: chats.threads.map(chat => chat.id === id ? { ...chat, ...data } : chat),
  }).then(() => {
    dispatch({ type: 'UPDATECHATS_SUCCESS', data });
  }).catch((err) => {
    dispatch({ type: 'UPDATECHATS_ERROR', err });
  })
};

export const removeChat = (id, project) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const chats = getState().firestore.data.chats;
  const ref = firestore.collection('projects').doc(project).collection('content');
  ref.doc('chats').update({
    threads: chats.threads.filter(chat => chat.id !== id),
  }).then(() => {
    dispatch({ type: 'UPDATECHATS_SUCCESS', id });
  }).catch((err) => {
    dispatch({ type: 'UPDATECHATS_ERROR', err });
  })
};

export const updateChats = (data, project) => (dispatch, gs, { getFirestore }) => {
  const firestore = getFirestore();
  const ref = firestore.collection('projects').doc(project).collection('content');
  ref.doc('chats').update({
    ...data,
  }).then(() => {
    dispatch({ type: 'UPDATECHATS_SUCCESS', data });
  }).catch((err) => {
    dispatch({ type: 'UPDATECHATS_ERROR', err });
  })
};
