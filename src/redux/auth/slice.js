import { createSlice } from "@reduxjs/toolkit";
import { login, refreshUser, register } from "./operations";

const INITIAL_STATE = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        // state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.isLoggedIn = true;
        state.token = payload.token;
        state.user = payload.user;
      })
      .addCase(register.rejected, (state, { payload }) => {
        // state.isLoggedIn = false;
        state.error = payload;
      })
      .addCase(login.pending, (state) => {
        // state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        // console.log(payload);
        state.isLoggedIn = true;
        state.token = payload.token;
        state.user = payload.user;
      })
      .addCase(login.rejected, (state, { payload }) => {
        // state.isLoggedIn = false;
        state.error = payload;
      })
      .addCase(refreshUser.pending, (state) => {
        state.error = null;
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isRefreshing = false;
      });
  },
});
export const authReducer = authSlice.reducer;
