const initial = {
  id: null,
};

const keywordsReducer = (state = initial, action) => {
  switch (action.type) {
    case 'CREATEKEYWORD_SUCCESS':
      console.log(action.data);
      return state;
    case 'CREATEKEYWORD_ERROR':
      console.log(action.err);
      return state;
    case 'UPDATEKEYWORD_SUCCESS':
      console.log(action.data);
      return state;
    case 'UPDATEKEYWORD_ERROR':
      console.log(action.err);
      return state;
    case 'REMOVEKEYWORD_SUCCESS':
      console.log(action.id);
      return state;
    case 'REMOVEKEYWORD_ERROR':
      console.log(action.err);
      return state;
    default: return state;
  }
};

export default keywordsReducer;
