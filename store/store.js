import { configureStore } from "@reduxjs/toolkit";
import violationsReducer from "./slices/violationSlice";
import profileReducer from "./slices/profileSlice";
import gatePassReducer from "./slices/gatePassSlice";

const store = configureStore({
  reducer: {
    home: violationsReducer,
    profile: profileReducer,
    gatepass: gatePassReducer,
  },
});

export default store;
