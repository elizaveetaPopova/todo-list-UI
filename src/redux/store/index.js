import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice";
import { tasksApi } from "./tasksApi";

export default configureStore({
  reducer: {
    tasks: taskReducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tasksApi.middleware),
});
