export const createProject = (data) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const uid = getState().firebase.auth.uid;
  const email = getState().firebase.auth.email;
  const firstname = getState().firestore.data[uid].firstname;
  const lastname = getState().firestore.data[uid].lastname;
  const user = { uid, email, firstname, lastname, nickname: firstname[0] + lastname[0] };
  const ref = firestore.collection('projects');
  ref.add({
    ...data, public: false,
    tags: [], emails: [email],
    members: [user], candidates: [],
  }).then((resp) => {
    const sprints = ref.doc(resp.id).collection('sprints');
    sprints.add({ todo: [], done: [], date: new Date() });
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

export const removeProject = (id) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const sprints = getState().firestore.ordered[id + 'sprints'];
  const ref = firestore.collection('projects');
  ref.doc(id).delete().then(() => {
    sprints.forEach(s => ref.doc(id).collection('sprints').doc(s.id).delete());
    dispatch({ type: 'REMOVEPROJECT_SUCCESS', id });
  }).catch((err) => {
    dispatch({ type: 'REMOVEPROJECT_SUCCESS', err });
  })
};

export const createSprint = (project) => (dispatch, gs, { getFirestore }) => {
  const firestore = getFirestore();
  const ref = firestore.collection('projects').doc(project).collection('sprints');
  ref.add({
    todo: [], done: [], date: new Date(),
  }).then(() => {
    dispatch({ type: 'CREATESPRINT_SUCCESS', project });
  }).catch((err) => {
    dispatch({ type: 'CREATESPRINT_ERROR', err });
  })
};

export const removeSprint = (id, project) => (dispatch, gs, { getFirestore }) => {
  const firestore = getFirestore();
  const ref = firestore.collection('projects').doc(project).collection('sprints');
  ref.doc(id).delete().then(() => {
    dispatch({ type: 'REMOVESPRINT_SUCCESS', id });
  }).catch((err) => {
    dispatch({ type: 'REMOVESPRINT_SUCCESS', err });
  })
};

export const createTask = (data, sprint, project) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const tasks = getState().firestore.data[project + 'sprints'][sprint];
  const ref = firestore.collection('projects').doc(project).collection('sprints');
  ref.doc(sprint).update({
    todo: [{ ...data }, ...tasks.todo],
  }).then(() => {
    dispatch({ type: 'CREATETASK_SUCCESS', data });
  }).catch((err) => {
    dispatch({ type: 'CREATETASK_ERROR', err });
  })
};

export const updateTask = (data, id, sprint, project) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const tasks = getState().firestore.data[project + 'sprints'][sprint];
  const ref = firestore.collection('projects').doc(project).collection('sprints');
  ref.doc(sprint).update({
    todo: tasks.todo.map(task => task.id === id ? { ...task, ...data } : task),
    done: tasks.done.map(task => task.id === id ? { ...task, ...data } : task),
  }).then(() => {
    dispatch({ type: 'UPDATETASK_SUCCESS', data });
  }).catch((err) => {
    dispatch({ type: 'UPDATETASK_ERROR', err });
  })
};

export const removeTask = (id, sprint, project) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const tasks = getState().firestore.data[project + 'sprints'][sprint];
  const ref = firestore.collection('projects').doc(project).collection('sprints');
  ref.doc(sprint).update({
    todo: tasks.todo.filter(task => task.id !== id),
    done: tasks.done.filter(task => task.id !== id),
  }).then(() => {
    dispatch({ type: 'REMOVETASK_SUCCESS', id });
  }).catch((err) => {
    dispatch({ type: 'REMOVETASK_ERROR', err });
  })
};

export const updateTasks = (data, sprint, project) => (dispatch, gs, { getFirestore }) => {
  const firestore = getFirestore();
  const ref = firestore.collection('projects').doc(project).collection('sprints');
  ref.doc(sprint).update({
    ...data,
  }).then(() => {
    dispatch({ type: 'UPDATETASKS_SUCCESS', data });
  }).catch((err) => {
    dispatch({ type: 'UPDATETASKS_ERROR', err });
  })
};
