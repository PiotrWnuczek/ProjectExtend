import { updateProject } from 'store/projectsActions';
import { updateProfile } from 'store/usersActions';

export const createTag = (data, project, profile) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const tags = getState().firestore.data.tags;
  const projectTags = project && getState().firestore.data[project].tags;
  const profileTags = profile && getState().firestore.data[profile].tags;
  const ref = firestore.collection('tags');
  project && !projectTags.includes(data) &&
    dispatch(updateProject({ tags: [data, ...projectTags] }, project));
  profile && !profileTags.includes(data) &&
    dispatch(updateProfile({ tags: [data, ...profileTags] }, profile));
  !tags.list.includes(data) && ref.doc('tags').update({
    list: [data, ...tags.list],
  }).then(() => {
    dispatch({ type: 'CREATETAG_SUCCESS', data });
  }).catch((err) => {
    dispatch({ type: 'CREATETAG_ERROR', err });
  })
};

export const removeTag = (data, project, profile) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const tags = getState().firestore.data.tags;
  const projectTags = project && getState().firestore.data[project].tags;
  const profileTags = profile && getState().firestore.data[profile].tags;
  const ref = firestore.collection('tags');
  project && projectTags.includes(data) &&
    dispatch(updateProject({ tags: projectTags.filter(tag => tag !== data) }, project));
  profile && profileTags.includes(data) &&
    dispatch(updateProfile({ tags: profileTags.filter(tag => tag !== data) }, profile));
  tags.list.includes(data) && ref.doc('tags').update({
    list: tags.list.filter(tag => tag !== data),
  }).then(() => {
    dispatch({ type: 'REMOVETAG_SUCCESS', data });
  }).catch((err) => {
    dispatch({ type: 'REMOVETAG_SUCCESS', err });
  })
};
