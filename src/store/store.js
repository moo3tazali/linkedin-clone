import { configureStore } from "@reduxjs/toolkit";
import cloudinaryApiSliceReducer from "./features/auth/cloudinaryApiSlice";

export const store = configureStore({
  reducer: {
    cloudinaryApi: cloudinaryApiSliceReducer,
  },
});
