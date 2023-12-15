import { configureStore } from '@reduxjs/toolkit';

import taskReducer from './taskSlice';
import appReducer from './appSlice';

const store = configureStore({
  reducer: {
    tasks: taskReducer,
    app: appReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


