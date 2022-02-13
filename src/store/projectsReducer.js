const initial = {
  id: null,
};

const projectsReducer = (state = initial, action) => {
  switch (action.type) {
    case 'RESETID_PROJECT':
      return { ...state, id: null };
    case 'CREATEPROJECT_SUCCESS':
      console.log(action.data);
      return { ...state, id: action.resp.id };
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
    case 'CREATETASK_SUCCESS':
      console.log(action.data);
      return state;
    case 'CREATETASK_ERROR':
      console.log(action.err);
      return state;
    case 'UPDATETASK_SUCCESS':
      console.log(action.data);
      return state;
    case 'UPDATETASK_ERROR':
      console.log(action.err);
      return state;
    case 'REMOVETASK_SUCCESS':
      console.log(action.id);
      return state;
    case 'REMOVETASK_ERROR':
      console.log(action.err);
      return state;
    default: return state;
  }
};

export default projectsReducer;
