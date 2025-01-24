import { configureStore } from "@reduxjs/toolkit";
import violationsReducer from "./slices/violationSlice";
import profileReducer from "./slices/profileSlice";
import gatePassReducer from "./slices/gatePassSlice";
import homeSlice from "./slices/homeSlice";

const store = configureStore({
  reducer: {
    violations: violationsReducer,
    profile: profileReducer,
    gatepass: gatePassReducer,
    home: homeSlice,
  },
});

export default store;
