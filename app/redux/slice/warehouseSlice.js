import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  warehouses: [],
};

export const warehouseSlice = createSlice({
  name: 'warehouses',
  initialState,
  reducers: {
    getWarehouses: (state, action) => ({ ...state, warehouses: [...action.payload] }),
  },
});

export const {
  getWarehouses,
} = warehouseSlice.actions;
export default warehouseSlice.reducer;
