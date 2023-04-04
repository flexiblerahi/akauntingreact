import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    histories: [],
};

export const historiesSlice = createSlice({
    name: 'histories',
    initialState,
    reducers: {
        gethistories: (state, action) => ({ ...state, histories: [...action.payload] }),
    },
});

export const {
    gethistories,
} = historiesSlice.actions;
export default historiesSlice.reducer;
