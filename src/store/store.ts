import { configureStore } from "@reduxjs/toolkit";
import timestampsReducer from "./timestampsSlice";
import currentTimestampsReducer from "./currentTimestampsSlice";

export const store = configureStore({
  reducer: {
    timestamps: timestampsReducer,
    currentTimestamps: currentTimestampsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
