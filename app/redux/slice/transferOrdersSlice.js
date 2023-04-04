import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transferOrders: [],
};

export const transferOrdersSlice = createSlice({
  name: 'transferOrders',
  initialState,
  reducers: {
    gettransferOrders: (state, action) => ({ ...state, transferOrders: [...action.payload] }),
  },
});

export const {
  gettransferOrders,
} = transferOrdersSlice.actions;
export default transferOrdersSlice.reducer;
