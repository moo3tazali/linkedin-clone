import { Avatar } from "@mui/material";
import cover from "../assets/cover-pic.png";
import { useEffect, useState } from "react";

const ProfileCard = () => {
  const [user, setUser] = useState({
    name: "",
    avatar: "/static/images/avatar/1.jpg",
  });



  return (
    <div className="card bg-white rounded-t-lg w-full overflow-hidden border border-gray-200 sm:border-b-0 shadow">
      <img src={cover} alt="cover" className="w-full object-contain" />
      <div className="flex justify-center -mt-7">
        <Avatar
          alt={user.name}
          src={user.avatar}
          sx={{ width: 70, height: 70 }}
          className="outline outline-white"
        />
      </div>
      <h4 className="text-center font-semibold mt-3">{user.name}</h4>
      <p className="text-center px-2 text-xs mb-3">
        Bank Teller @ Banque Misr | Customer Onboarding, Commercial Banking
      </p>
      <hr />
    </div>
  );
};

export default ProfileCard;
