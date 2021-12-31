const initial = {
  projects: [],
};

const projectReducer = (state = initial, action) => {
  switch (action.type) {
    case 'CREATEPROJECT_SUCCESS':
      console.log(action.data);
      return state;
    case 'CREATEPROJECT_ERROR':
      console.log(action.err);
      return state;
    case 'UPDATEPROJECT_SUCCESS':
      console.log(action.data);
      return state;
    case 'UPDATEPROJECT_ERROR':
      console.log(action.err);
      return state;
    case 'REMOVEPROJECT_SUCCESS':
      console.log(action.id);
      return state;
    case 'REMOVEPROJECT_ERROR':
      console.log(action.err);
      return state;
    default: return state;
  }
};

export default projectReducer;
