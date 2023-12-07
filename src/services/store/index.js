import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice";
import appReducer from "./appSlice";

export default configureStore({
  reducer: {
    tasks: taskReducer,
    app: appReducer,
  },
});
