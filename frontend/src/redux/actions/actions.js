import axios from 'axios';
import {
  USER_LOGIN,
  USER_LOGOUT,
  USER_LOADING,
  QUOTE_LOADING,
  QUOTE_SERVER_ERROR,
  GET_QUOTE,
  AUTH_SERVER_ERROR,
} from '../constants';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOADING, payload: true });

    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    const { data } = await axios.post(
      'http://localhost:5000/login',
      { email, password },
      config
    );
    dispatch({
      type: USER_LOGIN,
      payload: data,
    });

    ///////////////////////////////////////////////////////////////////////////////////
    // BAD PRACTICE I WOULD NEVER DO THIS IN REAL LIFE - but.. ok for take home project
    ///////////////////////////////////////////////////////////////////////////////////
    localStorage.setItem('userInfo', JSON.stringify(data));
    
  } catch (err) {
    dispatch({
      type: AUTH_SERVER_ERROR,
    });
  } finally {
    dispatch({ type: USER_LOADING, payload: false });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
};

export const getQuote = (payload) => async (dispatch, getState) => {
  try {
    dispatch({ type: QUOTE_LOADING, payload: true });

    const {
      user: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      'http://localhost:5000/quotation',
      payload,
      config
    );
    dispatch({
      type: GET_QUOTE,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: QUOTE_SERVER_ERROR,
    });
  } finally {
    dispatch({ type: QUOTE_LOADING, payload: false });
  }
};
