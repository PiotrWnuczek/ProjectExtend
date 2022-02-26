const initial = {
  id: null,
};

const tagsReducer = (state = initial, action) => {
  switch (action.type) {
    case 'SEARCH_TAGS':
      return { ...state, search: action.data };
    case 'CREATETAG_SUCCESS':
      console.log(action.data);
      return state;
    case 'CREATETAG_ERROR':
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
