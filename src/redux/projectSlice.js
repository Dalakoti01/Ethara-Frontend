import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
  name: "project",

  initialState: {
    projects: [],
    singleProject: null,
    loading: false,
    myProjects : [],
  },

  reducers: {
    setProjects: (state, action) => {
      state.projects = action.payload;
    },

    setSingleProject: (state, action) => {
      state.singleProject = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setMyProjects :(state,action) => {
      state.myProjects = action.payload;
    }
  },
});

export const {
  setProjects,
  setSingleProject,
  setLoading,
  setMyProjects,
} = projectSlice.actions;

export default projectSlice.reducer;