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
    const name = response.data.fullName;
    const title = response.data.title;
    const avatar = response.data.profilePic.url;
    const cover = response.data.coverPic.url;
    return { name, title, avatar, cover };
  } catch (err) {
    console.log(err);
  }
};
