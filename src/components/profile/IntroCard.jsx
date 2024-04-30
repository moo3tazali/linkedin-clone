/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { GetRequest } from "../../hooks/ApiRequests";
import UpdateCoverPic from "./UpdateCoverPic";
import UpdateProfilePic from "./UpdateProfilePic";

const IntroCard = () => {
  const location = useLocation();
  const { userId } = useSelector((state) => state.userData);
  const [isMyProfile, setIsMyProfile] = useState(false);
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
  const defaultCoverPic =
    "https://res.cloudinary.com/dlpkoketm/image/upload/v1711390852/Screenshot_2024_03_25_201913_1babd8460d.png";

  // GET USER PROFILE
  useEffect(() => {
    const getUserProfile = async () => {
      const { response, error } = await GetRequest("/api/users?populate=*");
      const currentPath = location.pathname.split("/").pop();
      response.map((user) => {
        if (user.username === currentPath) {
          setProfile({
            ...profile,
            name: user.fullName || user.username,
            title: user.title || "",
            avatar: user.profilePic?.url || "/static/images/avatar/1.jpg",
            cover: user.coverPic?.url || defaultCoverPic,
            userId: user.id,
            userName: user.username,
          });
        } else console.log("User not found");
      });

      if (error) console.log(error);
    };

    getUserProfile();

    if (profile.userId == userId) setIsMyProfile(true);
  }, [location]);

  return (
    <div className="col-span-9 bg-white rounded-lg w-full overflow-hidden border border-gray-200  shadow">
      <div className=" relative">
        <img
          src={profile.cover}
          alt="cover"
          className="w-full object-cover max-h-[150px] sm:max-h-[200px]"
        />

        {isMyProfile && <UpdateCoverPic currentPic={profile.cover} />}
      </div>
      <div className="px-5 pb-5">
        <UpdateProfilePic currentProfile={profile} />
        <h1 className="font-semibold mt-3 text-2xl">{profile.name}</h1>
        <p className="mb-3">{profile.title}</p>
      </div>
    </div>
  );
};

export default IntroCard;
