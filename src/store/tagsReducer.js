const initial = {
  id: null,
};

const tagsReducer = (state = initial, action) => {
  switch (action.type) {
    case 'QUERY_TAGS':
      return { ...state, query: action.data };
    case 'CREATETAG_SUCCESS':
      console.log(action.data);
      return state;
    case 'CREATETAG_ERROR':
      console.log(action.err);
      return state;
    default: return state;
  }
};

export default tagsReducer;
