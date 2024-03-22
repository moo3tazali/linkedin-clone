import axios from "axios";
import { getUserToken } from "./auth/handleAuth";

export const getUserData = async () => {
  const userToken = getUserToken();

  try {
    const response = await axios.get(
      "http://localhost:1337/api/users/me?populate=*",
      {
        headers: {
          Authorization: "Bearer " + userToken,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
