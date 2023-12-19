import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import taskReducer from './taskSlice';
import appReducer from './appSlice';
import authReducer from './authSlise';

const store = configureStore({
  reducer: {
    tasks: taskReducer,
    app: appReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


