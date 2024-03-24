import { Avatar } from "@mui/material";
import { useState, useEffect } from "react";
import { getUserData } from "../components/getUserData.js";

const ProfileCard = () => {
  const [user, setUser] = useState({
    name: "",
    title: "",
    cover: "",
    avatar: "/static/images/avatar/1.jpg",
  });

  useEffect(() => {
    getUserData().then((data) => {
      const { name, title, cover, avatar } = data;
      setUser({
        ...user,
        name,
        title,
        cover,
        avatar,
      });
    });
  }, []);

  return (
    <div className="card bg-white rounded-t-lg w-full overflow-hidden border border-gray-200 sm:border-b-0 shadow">
      <img src={user.cover} alt="cover" className="w-full object-contain" />
      <div className="flex justify-center -mt-7">
        <Avatar
          alt={user.name}
          src={user.avatar}
          sx={{ width: 70, height: 70 }}
          className="outline outline-white"
        />
      </div>
      <h4 className="text-center font-semibold mt-3">{user.name}</h4>
      <p className="text-center px-2 text-xs mb-3">{user.title}</p>
      <hr />
    </div>
  );
};

export default ProfileCard;
