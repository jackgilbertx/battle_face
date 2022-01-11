import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/userReducer';
import { quoteReducer } from './reducers/quoteReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    quote: quoteReducer,
  },
});
