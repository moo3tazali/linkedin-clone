import axios from 'axios';
import Cookies from 'js-cookie';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import defaultCoverPic from '../../../assets/defaultCover.png';

// redux createAsyncThunk
export const handleUserDataApi = createAsyncThunk('userDataApi', async () => {
  const token = Cookies.get('accessToken');
  const response = (
    await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  ).data.data;
  const userId = response.userId;
  const name = response.fullname || response.username;
  const userName = response.username;
  const title = response.title || '';
  const avatar = response.image || '';
  const cover = response.cover || defaultCoverPic;

  return { name, title, avatar, cover, userId, userName };
});
// redux local reducers
const initialState = {
  name: '',
  title: '',
  avatar: '',
  cover: '',
  userId: '',
  userName: '',
  isLoading: false,
};

export const userDataSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleUserDataApi.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(handleUserDataApi.rejected, (state) => {
        state.isLoading = false;
        // handleLogOut();
      })
      .addCase(handleUserDataApi.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.title = action.payload.title;
        state.avatar = action.payload.avatar;
        state.cover = action.payload.cover;
        state.userId = action.payload.userId;
        state.userName = action.payload.userName;
        state.isLoading = false;
      });
  },
});

// export const { login } = userDataSlice.actions;

export default userDataSlice.reducer;
