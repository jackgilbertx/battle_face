import { USER_LOGIN, USER_LOGOUT, LOADING, SERVER_ERROR } from '../constants';

const user = localStorage.getItem('userInfo');

const initialState = {
  user: user || null,
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN: {
      return { ...state, user: action.payload };
    }
    case USER_LOGOUT: {
      return { ...state, user: null };
    }
    case LOADING: {
      return { ...state, loading: action.payload };
    }
    case SERVER_ERROR: {
      return { ...state, error: action.payload };
    }
    default:
      return state;
  }
};

export { userReducer };
