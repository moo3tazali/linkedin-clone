import {
  Avatar,
  Tooltip,
  CloseIcon,
  NoPhotographyIcon,
  DoneIcon,
  CameraAltIcon,
} from "../../imports/import";
import { getUserToken } from "../../hooks/handleAuth";

import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ProfileCard = () => {
  const [coverPic, setCoverPic] = useState(null);
  const coverIconRef = useRef();
  const userToken = getUserToken();
  const location = useLocation();
  const { userId } = useSelector((state) => state.userData);

  const [profile, setProfile] = useState({
    name: "",
    title: "",
    avatar: "",
    cover: "",
    coverId: "",
    userId: "",
    userName: "",
    isLoading: false,
  });
  useEffect(() => {
    try {
      axios
        .get("http://localhost:1337/api/users?populate=*", {
          headers: { Authorization: "Bearer " + userToken },
        })
        .then((res) => {
          const users = res.data;
          const currentPath = location.pathname.split("/");
          const visitedProfileUserName = currentPath[currentPath.length - 1];
          users.map((user) => {
            if (user.username === visitedProfileUserName) {
              setProfile({
                ...profile,
                name: user.fullName || user.username,
                title: user.title || "",
                avatar: user.profilePic
                  ? user.profilePic.url
                  : "/static/images/avatar/1.jpg",
                cover: user.coverPic
                  ? user.coverPic.url
                  : "https://res.cloudinary.com/dlpkoketm/image/upload/v1711390852/Screenshot_2024_03_25_201913_1babd8460d.png",
                userId: user.id,
                userName: user.username,
              });
            }
          });
        });
    } catch (error) {
      console.log(error);
    }
  }, [location, userToken]);

  const handleOnChange = (e) => {
    setCoverPic(e.target.files[0]);
  };

  const handleUpdateCoverPic = async () => {
    const formData = new FormData();
    formData.append("coverPic", coverPic);
    await axios
      .put("http://localhost:1337/api/user/me", formData, {
        headers: { Authorization: "Bearer " + userToken },
      })
      .then((res) => {
        console.log(res.data);
        setCoverPic(null);
      });
  };

  const handleDeleteCoverPic = async () => {
    const formData = new FormData();
    formData.append("coverPic", "");
    await axios
      .put("http://localhost:1337/api/user/me", formData, {
        headers: { Authorization: "Bearer " + userToken },
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  const handleUpdateProfilePic = async () => {};
  return (
    <div className="col-span-9 bg-white rounded-lg w-full overflow-hidden border border-gray-200  shadow">
      <div className=" relative">
        <img
          src={coverPic ? URL.createObjectURL(coverPic) : profile.cover}
          alt="cover"
          className="w-full object-cover max-h-[150px] sm:max-h-[200px]"
        />
        <div
          onClick={() => coverIconRef.current.click()}
          className={`text-primary absolute top-5 shadow flex justify-center items-center right-5 bg-white w-7 h-7 rounded-full cursor-pointer ${
            coverPic ? "hidden" : ""
          }`}
        >
          <Tooltip title="Change" placement="left">
            <CameraAltIcon fontSize="small" />
          </Tooltip>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            ref={coverIconRef}
            onChange={handleOnChange}
          />
        </div>
        <div
          className={`absolute text-primary top-5 right-5 gap-2 flex-col ${
            coverPic ? "flex" : "hidden"
          }`}
        >
          <CloseIcon
            onClick={() => setCoverPic(null)}
            fontSize="large"
            className="bg-white  p-2 rounded-full cursor-pointer shadow"
          />
          <DoneIcon
            onClick={handleUpdateCoverPic}
            fontSize="large"
            className="bg-white  p-2 rounded-full cursor-pointer shadow"
          />
        </div>
        <Tooltip title="Remove" placement="left">
          <div
            onClick={handleDeleteCoverPic}
            className={`text-red-500 absolute top-14 shadow flex justify-center items-center right-5 bg-white w-7 h-7 rounded-full cursor-pointer ${
              profile.cover ? "" : "hidden"
            }`}
          >
            <NoPhotographyIcon fontSize="small" />
          </div>
        </Tooltip>
      </div>
      <div className="px-5 pb-5">
        <div className="flex justify-start -mt-[60px]">
          <Avatar
            onClick={handleUpdateProfilePic}
            alt={profile.name}
            src={profile.avatar}
            sx={{ width: 120, height: 120 }}
            className="outline outline-white"
          />
        </div>
        <h1 className="font-semibold mt-3 text-2xl">{profile.name}</h1>
        <p className="mb-3">{profile.title}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
