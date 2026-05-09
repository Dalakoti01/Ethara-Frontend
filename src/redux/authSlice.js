import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    allUsers: [],
    dashboard : null
  },

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAllUsers : (state, action) => {
      state.allUsers = action.payload;
    },
    setDashboard : (state, action) => {
      state.dashboard = action.payload;
    }
  },
});

export const {
  setUser,
  setIsAuthenticated,
  setLoading,
  setAllUsers,
  setDashboard
} = authSlice.actions;

export default authSlice.reducer;