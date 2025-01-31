import { configureStore } from "@reduxjs/toolkit";
import violationsReducer from "./slices/violationSlice";
import profileReducer from "./slices/profileSlice";
import gatePassReducer from "./slices/gatePassSlice";
import homeSlice from "./slices/homeSlice";
import authSlice from "./slices/authSlice";

const store = configureStore({
  reducer: {
    violations: violationsReducer,
    profile: profileReducer,
    gatepass: gatePassReducer,
    home: homeSlice,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
