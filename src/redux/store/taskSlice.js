import { createSlice } from "@reduxjs/toolkit";
import data from "../../mockData.json";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: data,
  },
  reducers: {
    getTasks(state, action) {},
    getOneTask(state, action) {},
    addTask(state, action) {
      state.tasks.push({
        title: action.payload.title,
        description: action.payload.description,
        status: false,
      });
    },
    deleteTask(state, action) {},
    updateTask(state, action) {},
    toggleTask(state, action) {
      const toggledTask = state.tasks.find(
        (task) => task.id === action.payload.taskId
      );
      toggledTask.status = !toggledTask.status;
    },
  },
});

export const {
  addTask,
  getTasks,
  getOneTask,
  deleteTask,
  updateTask,
  toggleTask,
} = taskSlice.actions;

export default taskSlice.reducer;
