import axios from 'axios';
import {
  USER_LOGIN,
  USER_LOGOUT,
  LOADING,
  SERVER_ERROR,
  GET_QUOTE,
} from '../constants';

export const userLogin = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOADING, payload: true });

    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    const { user } = await axios.post('/getToken', { email, password }, config);
    dispatch({
      type: USER_LOGIN,
      payload: user,
    });
    // BAD PRACTICE - but.. ok for take home project
    localStorage.setItem('userInfo', JSON.stringify(user));
  } catch (error) {
    dispatch({
      type: SERVER_ERROR,
    });
  } finally {
    dispatch({ type: LOADING, payload: false });
  }
};

export const userLogout = () => async (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
};

export const getQuot = () => async (dispatch) => {
  try {
    dispatch({ type: LOADING, payload: true });
    const { user } = await axios.get('/getToken');
    dispatch({
      type: GET_QUOTE,
      payload: user,
    });
    localStorage.setItem('userInfo', JSON.stringify(user));
  } catch (error) {
    dispatch({
      type: SERVER_ERROR,
    });
  } finally {
    dispatch({ type: LOADING, payload: false });
  }
};
