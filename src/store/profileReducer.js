const initial = {
  error: null,
};

const profileReducer = (state = initial, action) => {
  switch (action.type) {
    case 'SIGNIN_SUCCESS':
      console.log('signin success');
      return { ...state, error: null };
    case 'SIGNIN_ERROR':
      console.log('signin error');
      return { ...state, error: action.err.message };
    case 'SIGNUP_SUCCESS':
      console.log('signup success');
      return { ...state, error: null };
    case 'SIGNUP_ERROR':
      console.log('signup error');
      return { ...state, error: action.err.message };
    case 'SIGNOUT_SUCCESS':
      console.log('signout success');
      return state;
    case 'UPDATEPROFILE_SUCCESS':
      console.log(action.data);
      return state;
    case 'UPDATEPROFILE_ERROR':
      console.log(action.err);
      return state;
    case 'REMOVEPROFILE_SUCCESS':
      console.log('removeprofile success');
      return state;
    default: return state;
  }
};

export default profileReducer;
