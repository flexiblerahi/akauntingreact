import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  groups: [],
};

export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    getgroups: (state, action) => ({ ...state, groups: [...action.payload] }),
  },
});

export const {
  getgroups,
} = groupsSlice.actions;
export default groupsSlice.reducer;
