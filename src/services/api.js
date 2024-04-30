import axios from "axios";
import { getUserToken } from "../hooks/handleAuth";

const userToken = getUserToken();
const baseURL = "http://localhost:1337/api";

const axiosInstance = axios.create({
  baseURL,
  headers: { Authorization: "Bearer " + userToken },
});

// POSTS API
export const getPosts = async () =>
  (await axiosInstance.get("posts?sort=desc")).data.data.results;

// COMMENTS API
export const getComments = async (postID) =>
  (await axiosInstance.get(`posts/${postID}/comments?sort=desc`)).data.data
    .results;

export const createComment = async (data) =>
  await axiosInstance.post("comments", data);

// LIKES API

export const getLikes = async (postID) =>
  (await axiosInstance.get(`likes/${postID}`)).data.data.results;

export const addLike = async (postID) =>
  await axiosInstance.post(`posts/${postID}/likes`);

export const removeLike = async (postID) =>
  await axiosInstance.delete(`likes/${postID}`);
