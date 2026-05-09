import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "task",

  initialState: {
    tasks: [],
    loading: false,
    myTasks : []
  },

  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setMyTasks : (state,action) => {
      state.myTasks = action.payload;
    }
  },
});

export const {
  setTasks,
  setLoading,
  setMyTasks
} = taskSlice.actions;

export default taskSlice.reducer;