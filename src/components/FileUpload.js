import axios from "axios";
import { getUserToken } from "./auth/handleAuth";

const userToken = getUserToken();

export const FileUpload = async (selectedFile, postId) => {
  const formData = new FormData();
  selectedFile.map((file) => {
    formData.append("files", file);
    formData.append("refId", postId);
    formData.append("ref", "api::post.post");
    formData.append("field", "media");
  });

  try {
    const response = await axios.post(
      "http://localhost:1337/api/upload/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + userToken,
        },
      }
    );
    return response.data; // Handle successful upload response
  } catch (error) {
    console.error(error); // Handle upload errors
  }
};
