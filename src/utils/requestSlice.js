import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequests: (state, action) => {
      return action.payload;
    },
    /** 1.state → This is your current list of requests in Redux.

        2.action.payload → This is the _id of the request you want to remove.

        3.filter() → Goes through the whole state (i.e., list of requests), and keeps only those where r._id !== action.payload 
    */
    removeRequest: (state, action) => {
      const newArray = state.filter((r) => r._id !== action.payload);
      return newArray;
    },
  },
});
export const { addRequests, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;
