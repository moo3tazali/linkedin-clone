import axios from "axios";
import { getUserToken } from "./handleAuth";

const userToken = getUserToken();
const BaseURL = "http://localhost:1337";

export const GetRequest = async (route) => {
  try {
    const res = await axios.get(`${BaseURL}${route}`, {
      headers: { Authorization: "Bearer " + userToken },
    });
    const response = res.data;
    return { response };
  } catch (err) {
    const error = err.message;
    return { error };
  }
};

export const PutRequest = async (route, data) => {
  try {
    const res = await axios.put(`${BaseURL}${route}`, data, {
      headers: { Authorization: "Bearer " + userToken },
    });
    const response = res.data;
    return { response };
  } catch (err) {
    const error = err.message;
    return { error };
  }
};

export const DeleteRequest = async (route) => {
  try {
    const res = await axios.delete(`${BaseURL}${route}`, {
      headers: { Authorization: "Bearer " + userToken },
    });
    const response = res.data;
    return { response };
  } catch (err) {
    const error = err.message;
    return { error };
  }
};
