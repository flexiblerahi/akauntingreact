import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    getCategories: (state, action) => ({ ...state, categories: [...action.payload] }),
  },
});

export const {
  getCategories,
} = categoriesSlice.actions;
export default categoriesSlice.reducer;
