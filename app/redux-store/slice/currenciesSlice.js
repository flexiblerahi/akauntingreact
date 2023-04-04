import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currencies: [],
};

export const currenciesSlice = createSlice({
  name: 'currencies',
  initialState,
  reducers: {
    getCurrencies: (state, action) => ({ ...state, currencies: [...action.payload] }),
  },
});

export const {
  getCurrencies,
} = currenciesSlice.actions;
export default currenciesSlice.reducer;
