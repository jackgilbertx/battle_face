import axios from 'axios';
import { USER_LOGIN } from '../constants';

export const listBanners = () => async (dispatch) => {
  // try {
  //   dispatch({ type: LOADING, payload: true });
  //   const {
  //     data: { banners },
  //   } = await axios.get('/api/banners');
  //   dispatch({
  //     type: LIST_BANNERS,
  //     payload: banners,
  //   });
  // } catch (error) {
  //   dispatch({
  //     type: SERVER_ERROR,
  //   });
  // } finally {
  //   dispatch({ type: LOADING, payload: false });
  // }
};
