import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  taxes: [],
};

export const taxesSlice = createSlice({
  name: 'taxes',
  initialState,
  reducers: {
    getTaxes: (state, action) => ({ ...state, taxes: [...action.payload] }),
  },
});

export const {
  getTaxes,
} = taxesSlice.actions;
export default taxesSlice.reducer;
