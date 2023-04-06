import { createSlice } from "@reduxjs/toolkit";
import { Timestamp } from "../types/Timestamp";

const initialState: Array<Timestamp> = [];

export const timestampsSlice = createSlice({
  name: "timestamps",
  initialState,
  reducers: {
    getTimestamps: (_, action) => {
      return action.payload;
    },
  },
});

export const { getTimestamps } = timestampsSlice.actions;

export default timestampsSlice.reducer;
