import axios from "axios";
import { getUserToken } from "../hooks/handleAuth";

const userToken = getUserToken(); 

const baseURL = "http://localhost:1337/api";

const axiosInstance = axios.create({
  baseURL,
  headers: { Authorization: "Bearer " + userToken },
});

// AUTHENTICATION API

export const login = async (data) =>
  (await axiosInstance.post("auth/local", data)).data;

export const register = async (data) =>
  (await axiosInstance.post("auth/local/register", data)).data;

// POSTS API
export const getPosts = async (pageParam, limit = 6) =>
  (
    await axiosInstance.get(
      `posts?sort=desc&page=${pageParam + 1}&pageSize=${limit}`
    )
  ).data.data.results;

export const createPost = async (data) =>
  await axiosInstance.post("posts", data);

export const deletePost = async (id) =>
  await axiosInstance.delete(`posts/${id}`);

// COMMENTS API
export const getComments = async (postID, pageParam) =>
  (
    await axiosInstance.get(
      `posts/${postID}/comments?sort=desc&page=${pageParam + 1}`
    )
  ).data.data.results;

export const createComment = async (data) =>
  await axiosInstance.post("comments", data);

export const deleteComment = async (id) =>
  await axiosInstance.delete(`comments/${id}`);

// LIKES API

export const getLikes = async (postID) =>
  (await axiosInstance.get(`likes/${postID}`)).data.data.results;

export const addLike = async (postID) =>
  await axiosInstance.post(`posts/${postID}/likes`);

export const removeLike = async (postID) =>
  await axiosInstance.delete(`likes/${postID}`);

// PROFILE API

export const getUsers = async () =>
  (await axiosInstance.get("users?populate=*")).data;

export const updateMe = async (data) =>
  await axiosInstance.put("user/me", data);

export const deleteCover = async () =>
  await axiosInstance.delete("user/me/cover-pic");

export const deleteProfilePic = async () =>
  await axiosInstance.delete("user/me/profile-pic");
