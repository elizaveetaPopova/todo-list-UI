import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

const setError = (state: TasksState, action: PayloadAction<any>) => {
  state.status = 'rejected';
  state.error = action.payload;
};

interface TaskState {
  _id: string,
  title: string,
  description: string,
  status: boolean,
}

interface TasksState {
  tasks: Array<TaskState>,
  task: TaskState | null,
  status: null | 'loading' | 'resolved' |  'rejected',
  error: null ,
}

interface NewTaskBody {
  title: string,
  description: string,
}

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
      if (!response.ok) {
        throw new Error('Ошибка запроса');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const fetchTask = createAsyncThunk(
  'tasks/fetchTask',
  async (id:string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`);
      if (!response.ok) {
        throw new Error('Ошибка запроса');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const removeTask = createAsyncThunk(
  'tasks/removeTask',
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Ошибка запроса');
      }
      dispatch(deleteTask(id));
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const removeTasks = createAsyncThunk(
  'tasks/removeTasks',
  async (tasksIds: Array<string>, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(tasksIds),
      });
      if (!response.ok) {
        throw new Error('Ошибка запроса');
      }
      dispatch(deleteTasks());
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const addNewTask = createAsyncThunk(
  'tasks/addTask',
  async (task: NewTaskBody, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(task),
      });
      if (!response.ok) {
        throw new Error('Невозможно добавить задачу');
      }
      const data = await response.json();
      dispatch(addTask(data));
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, body }: {id: string, body: object}, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error('Невозможно обновить задачу');
      }
      dispatch(fetchTasks());
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);



const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    task: null,
    status: null,
    error: null,
  } as TasksState,

  reducers: {
    getOneTask(state, action: PayloadAction<string>) {
      const task = state.tasks.find((task) => task._id === action.payload);
      if (task) {
        state.task = task;
      }
    },
    
    resetTask(state) {
      state.task = null;
    },

    addTask(state, action: PayloadAction<TaskState>) {
      state.tasks.push(action.payload);
    },

    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter(
        (task) => task._id !== action.payload,
      );
    },
    deleteTasks(state) {
      state.tasks = state.tasks.filter((task) => !task.status);
    },

    // toggleTask(state, action) {
    //   const toggledTask = state.tasks.find(
    //     (task) => task._id === action.payload.taskId
    //   );
    //   toggledTask.status = !toggledTask.status;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state, action: PayloadAction<any>) => {
      state.status = 'loading';
      state.tasks = action.payload;
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.status = 'resolved';
      state.tasks = action.payload;
    });
    builder.addCase(fetchTask.pending, (state, action: PayloadAction<any>) => {
      state.status = 'loading';
      state.task = action.payload;
    });
    builder.addCase(fetchTask.fulfilled, (state, action) => {
      state.status = 'resolved';
      state.task = action.payload;
    });
    builder.addCase(fetchTasks.rejected, setError);
    builder.addCase(fetchTask.rejected, setError);
    builder.addCase(removeTask.rejected, setError);
    builder.addCase(removeTasks.rejected, setError);
    builder.addCase(addNewTask.rejected, setError);
    builder.addCase(updateTask.rejected, setError);
  },
});

export const {
  addTask,
  getOneTask,
  deleteTask,
  // toggleTask,
  resetTask,
  deleteTasks,
} = taskSlice.actions;

export default taskSlice.reducer;
