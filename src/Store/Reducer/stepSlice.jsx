import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentStep: "bookingType",
};

export const stepSlice = createSlice({
  name: "Booking Steps",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.currentStep = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setStep } = stepSlice.actions;

export default stepSlice.reducer;
