import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getUserToken } from "../../components/auth/handleAuth";

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
  // console.log(response.data);
  const userId = response.data.id;
  const name = response.data.fullName || response.data.username;
  const userName = response.data.username;
  const title = response.data.title || "";
  const avatar = response.data.profilePic ? response.data.profilePic.url : "";
  const cover = response.data.coverPic
    ? response.data.coverPic.url
    : "https://res.cloudinary.com/dlpkoketm/image/upload/v1711390852/Screenshot_2024_03_25_201913_1babd8460d.png";
  const coverId = response.data.coverPic ? response.data.coverPic.id : "";
  return { name, title, avatar, cover, userId, userName, coverId };
});

const initialState = {
  name: "",
  title: "",
  avatar: "/static/images/avatar/1.jpg",
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