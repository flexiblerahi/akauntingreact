import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  variants: [],
};

export const variantsSlice = createSlice({
  name: 'variants',
  initialState,
  reducers: {
    getvariants: (state, action) => ({ ...state, variants: [...action.payload] }),
  },
});

export const {
  getvariants,
} = variantsSlice.actions;
export default variantsSlice.reducer;
