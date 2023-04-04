import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarOpen: window.localStorage.getItem("sidebarOpen"),
};

export const sidebarOpenSlice = createSlice({
  name: 'sidebarOpen',
  initialState,
  reducers: {
    getsidebarOpen: (state, action) => ({ state, sidebarOpen: action.payload }),
  },
});

export const {
  getsidebarOpen,
} = sidebarOpenSlice.actions;
export default sidebarOpenSlice.reducer;
