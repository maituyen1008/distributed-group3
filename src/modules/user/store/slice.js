import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  listUser: [],
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, { payload }) => {
      state.user = payload;
    },
  },
  extraReducers: (builder) => {},
});

export default user;
