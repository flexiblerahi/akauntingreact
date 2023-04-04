import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accounts: [],
};

export const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    getAccounts: (state, action) => ({ ...state, accounts: [...action.payload] }),
  },
});

export const {
  getAccounts,
} = accountsSlice.actions;
export default accountsSlice.reducer;
