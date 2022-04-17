import { updateProject } from 'store/projectsActions';
import { updateProfile } from 'store/usersActions';

export const createTag = (data, project, profile) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  const tags = getState().firestore.data.tags;
  const ref = firestore.collection('tags');
  project && dispatch(updateProject({ tags: data }, project));
  profile && dispatch(updateProfile({ tags: data }, profile));
  !tags.list.includes(data.at(-1)) && ref.doc('tags').update({
    list: [data.at(-1), ...tags.list],
  }).then(() => {
    dispatch({ type: 'CREATETAG_SUCCESS', data });
  }).catch((err) => {
    dispatch({ type: 'CREATETAG_ERROR', err });
  })
};

export const removeTag = (data, project, profile) => (dispatch, gs, { gf }) => {
  project && dispatch(updateProject({ tags: data }, project));
  profile && dispatch(updateProfile({ tags: data }, profile));
};
