import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    invoices: [],
};

export const invoicesSlice = createSlice({
    name: 'invoices',
    initialState,
    reducers: {
        getinvoices: (state, action) => ({ ...state, invoices: [...action.payload] }),
    },
});

export const {
    getinvoices,
} = invoicesSlice.actions;
export default invoicesSlice.reducer;
