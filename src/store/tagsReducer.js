const initial = {
  id: null,
};

const tagsReducer = (state = initial, action) => {
  switch (action.type) {
    case 'CREATETAG_SUCCESS':
      console.log(action.data);
      return state;
    case 'CREATETAG_ERROR':
      console.log(action.err);
      return state;
    case 'UPDATETAG_SUCCESS':
      console.log(action.data);
      return state;
    case 'UPDATETAG_ERROR':
      console.log(action.err);
      return state;
    case 'REMOVETAG_SUCCESS':
      console.log(action.id);
      return state;
    case 'REMOVETAG_ERROR':
      console.log(action.err);
      return state;
    default: return state;
  }
};

export default tagsReducer;
