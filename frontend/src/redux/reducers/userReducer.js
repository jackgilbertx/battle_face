import { USER_LOGIN } from '../constants';

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN: {
      return { ...state, user: action.payload };
    }
    default:
      return state;
  }
};

export { userReducer };
