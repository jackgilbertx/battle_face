import {
  USER_LOGIN,
  USER_LOGOUT,
  USER_LOADING,
  AUTH_SERVER_ERROR,
} from '../constants';

const localStorageUser = localStorage.getItem('userInfo');
const parsedUser = JSON.parse(localStorageUser);

const initialState = {
  userInfo: parsedUser || null,
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN: {
      return { ...state, userInfo: action.payload, error: false };
    }
    case USER_LOGOUT: {
      return { ...state, userInfo: null, error: false };
    }
    case USER_LOADING: {
      return { ...state, loading: action.payload };
    }
    case AUTH_SERVER_ERROR: {
      return { ...state, error: true };
    }
    default:
      return state;
  }
};

export { userReducer };
