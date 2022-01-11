import {
  QUOTE_LOADING,
  QUOTE_SERVER_ERROR,
  GET_QUOTE,
  USER_LOGOUT,
} from '../constants';

const initialState = {
  quote: null,
  loading: false,
  error: null,
};

const quoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_QUOTE: {
      return { ...state, quote: action.payload, error: false };
    }
    case QUOTE_LOADING: {
      return { ...state, loading: action.payload };
    }
    case QUOTE_SERVER_ERROR: {
      return { ...state, error: true };
    }
    case USER_LOGOUT: {
      return initialState;
    }
    default:
      return state;
  }
};

export { quoteReducer };
