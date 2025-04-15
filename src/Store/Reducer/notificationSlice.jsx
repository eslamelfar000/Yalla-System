import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notification: []
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.notification = action.payload;
    },
  },
});

// Export actions
export const { setNotification } = notificationSlice.actions;

// Export reducer
export default notificationSlice.reducer;
