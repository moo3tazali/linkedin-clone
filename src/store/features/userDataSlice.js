import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getUserToken } from "../../hooks/handleAuth";
// redux createAsyncThunk
export const handleUserDataApi = createAsyncThunk("userDataApi", async () => {
  const userToken = getUserToken();
  const response = await axios.get(
    "http://localhost:1337/api/users/me?populate=*",
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
  const avatar = response.data.profilePic?.url || "/static/images/avatar/1.jpg";
  const cover =
    response.data.coverPic?.url ||
    "https://res.cloudinary.com/dlpkoketm/image/upload/v1711390852/Screenshot_2024_03_25_201913_1babd8460d.png";
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
