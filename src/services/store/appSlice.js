import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    isPopupOpen: false,
  },
  reducers: {
    setPopupStatus(state, action) {
      state.isPopupOpen = action.payload;
    },
  },
});

export const { setPopupStatus } = appSlice.actions;

export default appSlice.reducer;
