import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    customers: [],
};

export const customersSlice = createSlice({
    name: 'customers',
    initialState,
    reducers: {
        getcustomers: (state, action) => ({ ...state, customers: [...action.payload] }),
    },
});

export const {
    getcustomers,
} = customersSlice.actions;
export default customersSlice.reducer;
