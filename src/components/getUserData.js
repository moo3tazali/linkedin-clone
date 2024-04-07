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
    const userId = response.data.id;
    const name = response.data.fullName || response.data.username;
    const userName = response.data.username;
    const title = response.data.title || "";
    const avatar = response.data.profilePic ? response.data.profilePic.url : "";
    const cover = response.data.coverPic
      ? response.data.coverPic.url
      : "https://res.cloudinary.com/dlpkoketm/image/upload/v1711390852/Screenshot_2024_03_25_201913_1babd8460d.png";
    return { name, title, avatar, cover, userId, userName };
  } catch (err) {
    console.log(err);
  }
};



