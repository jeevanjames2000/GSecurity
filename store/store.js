import { configureStore } from "@reduxjs/toolkit";
import violationsReducer from "./slices/violationSlice";
import profileReducer from "./slices/profileSlice";

const store = configureStore({
  reducer: {
    home: violationsReducer,
    profile: profileReducer,
  },
});

export default store;
