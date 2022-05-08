const initial = {
  id: null,
};

const projectsReducer = (state = initial, action) => {
  switch (action.type) {
    case 'RESETID_PROJECT':
      return { ...state, newProject: null };
    case 'CREATEPROJECT_SUCCESS':
      console.log(action.data);
      return { ...state, newProject: action.resp.id };
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
    case 'CREATESPRINT_SUCCESS':
      console.log(action.project);
      return state;
    case 'CREATESPRINT_ERROR':
      console.log(action.err);
      return state;
    case 'UPDATESPRINT_SUCCESS':
      console.log(action.data);
      return state;
    case 'UPDATESPRINT_ERROR':
      console.log(action.err);
      return state;
    case 'REMOVESPRINT_SUCCESS':
      console.log(action.id);
      return state;
    case 'REMOVESPRINT_ERROR':
      console.log(action.err);
      return state;
    case 'RESETID_TASK':
      return { ...state, newTask: null };
    case 'CREATETASK_SUCCESS':
      console.log(action.data);
      return { ...state, newTask: action.data.id };
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
    case 'UPDATETASKS_SUCCESS':
      console.log(action.data);
      return state;
    case 'UPDATETASKS_ERROR':
      console.log(action.err);
      return state;
    default: return state;
  }
};

export default projectsReducer;
