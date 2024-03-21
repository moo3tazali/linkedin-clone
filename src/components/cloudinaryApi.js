import axios from "axios";

export const cloudinaryApi = async (image) => {
  const data = new FormData();
  data.append("file", image);
  data.append("upload_preset", "linkedin");
  data.append("cloud_name", "");

  const response = await axios.post(
    "https://api.cloudinary.com/v1_1/dlpkoketm/image/upload",
    data
  );

  const imageUrl = response.data.secure_url;
  return imageUrl;
};
