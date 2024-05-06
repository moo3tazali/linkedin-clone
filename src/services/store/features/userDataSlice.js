import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getUserToken, handleLogOut } from "../../../utils/handleAuth";
import defaultCoverPic from "../../../assets/defaultCover.png";

// redux createAsyncThunk
export const handleUserDataApi = createAsyncThunk("userDataApi", async () => {
  const userToken = getUserToken();
  const response = await axios.get(
    "https://linkedin-8qzg.onrender.com/api/users/me?populate=*",
    {
      headers: {
        Authorization: "Bearer " + userToken,
      },
    }
  );
  const userId = response.data.id;
  const name = response.data.fullName || response.data.username;
  const userName = response.data.username;
  const title = response.data.title || "";
  const avatar = response.data.profilePic?.url || "";
  const cover = response.data.coverPic?.url || defaultCoverPic;
  const coverId = response.data.coverPic?.id || "";
  return { name, title, avatar, cover, userId, userName, coverId };
});
// redux local reducers
const initialState = {
  name: "",
  title: "",
  avatar: "",
  cover: "",
  coverId: "",
  userId: "",
  userName: "",
  isLoading: false,
};

export const userDataSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleUserDataApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(handleUserDataApi.rejected, (state) => {
        state.isLoading = false;
        handleLogOut();
      })
      .addCase(handleUserDataApi.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.title = action.payload.title;
        state.avatar = action.payload.avatar;
        state.cover = action.payload.cover;
        state.coverId = action.payload.coverId;
        state.userId = action.payload.userId;
        state.userName = action.payload.userName;
        state.isLoading = false;
      });
  },
});

// export const { login } = userDataSlice.actions;

export default userDataSlice.reducer;
