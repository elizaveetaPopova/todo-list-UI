import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:3002";

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/tasks`);
      if (!response.ok) {
        throw new Error("Ошибка запроса");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeTask = createAsyncThunk(
  "tasks/removeTask",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Ошибка запроса");
      }
      dispatch(deleteTask({ id }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addNewTask = createAsyncThunk(
  "tasks/addTask",
  async (task, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(task),
      });
      if (!response.ok) {
        throw new Error("Невозможно добавить задачу");
      }
      const data = await response.json();
      dispatch(addTask(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
};

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    status: null,
    error: null,
  },
  reducers: {
    getOneTask(state, action) {},

    addTask(state, action) {
      state.tasks.push(action.payload);
    },
    deleteTask(state, action) {
      state.tasks = state.tasks.filter(
        (task) => task._id !== action.payload.id
      );
    },
    updateTask(state, action) {},
    toggleTask(state, action) {
      const toggledTask = state.tasks.find(
        (task) => task._id === action.payload.taskId
      );
      toggledTask.status = !toggledTask.status;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state, action) => {
      state.status = "loading";
      state.tasks = action.payload;
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.status = "resolved";
      state.tasks = action.payload;
    });
    builder.addCase(fetchTasks.rejected, setError);
    builder.addCase(removeTask.rejected, setError);
    builder.addCase(addNewTask.rejected, setError);
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
