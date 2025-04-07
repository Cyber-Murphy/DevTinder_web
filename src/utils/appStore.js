// So we are creating a redux store to make global state so that all components can use it

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    // coming from feedslice.js
    feed: feedReducer,
  },
});

export default appStore;
