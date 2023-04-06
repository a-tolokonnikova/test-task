import { createSlice } from "@reduxjs/toolkit";
import { Timestamp } from "../types/Timestamp";

const initialState: Array<Timestamp> = [];

export const currentTimestampsSlice = createSlice({
  name: "currentTimestamps",
  initialState,
  reducers: {
    updateCurrentTimestamps: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateCurrentTimestamps } = currentTimestampsSlice.actions;

export default currentTimestampsSlice.reducer;
