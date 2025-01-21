import { configureStore } from "@reduxjs/toolkit";
import violationsReducer from "./slices/violationSlice";

const store = configureStore({
  reducer: {
    violations: violationsReducer,
  },
});

export default store;
