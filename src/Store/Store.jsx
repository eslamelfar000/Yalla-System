import { configureStore } from "@reduxjs/toolkit";
import stepReducer from "./Reducer/stepSlice";
import bookingReducer from "./Reducer/bookingSlice";

export const store = configureStore({
  reducer: {
    step: stepReducer,
    booking: bookingReducer,
  },
});

