import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  booking: {
    bookingType: "free",
    name: "Free Trail Lesson",
    price: 0,
    currency: "ILS",
    lessons: 1,
    eventDate: [],
  },
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    updateBooking: (state, action) => {
      state.booking = { ...state.booking, ...action.payload }; // Merge new data
    },
  },
});

// Export actions
export const { updateBooking } = bookingSlice.actions;

// Export reducer
export default bookingSlice.reducer;
