import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  adjustments: [],
};

export const adjustmentsSlice = createSlice({
  name: 'adjustments',
  initialState,
  reducers: {
    getadjustments: (state, action) => ({ ...state, adjustments: [...action.payload] }),
  },
});

export const {
  getadjustments,
} = adjustmentsSlice.actions;
export default adjustmentsSlice.reducer;
