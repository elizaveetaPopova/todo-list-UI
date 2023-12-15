import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  isPopupOpen: boolean
}

const initialState: AppState = {
  isPopupOpen: false,
};


const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setPopupStatus(state, action: PayloadAction<boolean>) {
      state.isPopupOpen = action.payload;
    },
  },
});

export const { setPopupStatus } = appSlice.actions;

export default appSlice.reducer;
