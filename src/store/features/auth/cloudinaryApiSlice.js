import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const handleCloudinaryApi = createAsyncThunk(
  "cloudinaryApi",
  async (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "linkedin");
    data.append("cloud_name", "");

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dlpkoketm/image/upload",
      data
    );

    const imageUrl = response.data.secure_url;
    return imageUrl;
  }
);

const initialState = {
  imageUrl: "",
};

export const cloudinaryApiSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(handleCloudinaryApi.fulfilled, (state, action) => {
      state.imageUrl = action.payload;
    });
  },
});

export const { login } = cloudinaryApiSlice.actions;

export default cloudinaryApiSlice.reducer;
