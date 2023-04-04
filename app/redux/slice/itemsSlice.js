import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    getItems: (state, action) => ({ ...state, items: [...action.payload] }),
  },
});

export const {
  getItems,
} = itemsSlice.actions;
export default itemsSlice.reducer;
