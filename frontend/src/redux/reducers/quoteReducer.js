import { LOADING, SERVER_ERROR, GET_QUOTE } from '../constants';

const initialState = {
  quote: null,
  loading: false,
  error: null,
};

const quoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_QUOTE: {
      return { ...state, quote: action.payload };
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

export { quoteReducer };
