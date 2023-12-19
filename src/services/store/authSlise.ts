import { ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import AxiosPromise, { AxiosError } from 'axios';

import { axiosInstance } from '../api/instance';
import Endpoints from '../api/endpoints';
import { ILoginRequest, ILoginResponse, IRegisterRequest } from '../api/auth/types';

export interface AuthState {
    accessToken: string | null,
    isLoading: boolean,
    error: string | null
}

const initialState: AuthState = {
   
  accessToken: null,
  isLoading: false,
  error: null,
};

export const loginStart = createAsyncThunk(
  'auth/loginStart',
  async (params: ILoginRequest, { rejectWithValue, dispatch }) => {
    try {
      
      const response = await axiosInstance.post<ILoginResponse>(Endpoints.AUTH.LOGIN, params);
      console.log('response :>> ', response);
      const { accessToken } = response.data;
      return accessToken;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const register = createAsyncThunk(
  'auth/register',
  async (params: IRegisterRequest, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<ILoginResponse>(Endpoints.AUTH.REGISTER, params);
      console.log('response :>> ', response);
    //   const { accessToken } = response.data;
    //   return accessToken;
    } catch (error) {
      return rejectWithValue((error as AxiosError).message);
    }
  },
);

const authSlise = createSlice({
  name: 'auth',
  initialState,
  reducers: {
     
  },
  extraReducers: (builder:ActionReducerMapBuilder<AuthState>) => {
    builder.addCase(loginStart.pending, (state, action) => {
      console.log('action.payload :>> ', action.payload);
      state.isLoading = true;
      if (action.payload) {
        state.accessToken = action.payload;
      }
    });
    builder.addCase(loginStart.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.accessToken = action.payload;
      }
      state.error = null;
    });
    builder.addCase(loginStart.rejected, (state, action) => {
      state.isLoading = false;
      console.log('action.payload :>> ', action.payload);
    //   if (action.payload) {
    //       state.authData.error = action.payload;
    //   } 
    });
    builder.addCase(register.pending, (state, action) => {
      state.isLoading = true;
      if (action.payload) {
            
      }
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload) {

      }
      state.error = null;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      if (action.payload) {

        //   state.error = action.payload;
      }
    });
  },
});

export const {  } = authSlise.actions;

export default authSlise.reducer;
