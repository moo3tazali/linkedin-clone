import { Avatar } from "@mui/material";
import NewPostDialog from "./NewPostDialog";
import MmsIcon from "@mui/icons-material/Mms";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import { useEffect, useState } from "react";

const StartNewPost = () => {
  const [user, setUser] = useState({
    name: "",
    avatar: "/static/images/avatar/1.jpg",
  });


  return (
    <div className="bg-white p-3 rounded-lg shadow border border-gray-200">
      <div className="flex items-center gap-3">
        <Avatar
          alt={user.name}
          src={user.avatar}
          sx={{ width: 48, height: 48 }}
          className="outline outline-white"
        />
        <NewPostDialog />
      </div>
      <div className="mt-1 flex justify-between items-center">
        <div className="flex items-center gap-2 py-3 px-2 w-fit rounded cursor-pointer transition-all duration-300 hover:bg-background">
          <MmsIcon className="text-primary" />
          <span className="text-secondary font-semibold text-sm">Media</span>
        </div>
        <div className="flex items-center gap-2 py-3 px-2 w-fit rounded cursor-pointer transition-all duration-300 hover:bg-background">
          <CalendarMonthIcon className="text-[#C37D16]" />
          <span className="text-secondary font-semibold text-sm">Event</span>
        </div>
        <div className="flex items-center gap-2 py-3 px-2 w-fit rounded cursor-pointer transition-all duration-300 hover:bg-background">
          <NewspaperIcon className="text-[#E06847]" />
          <span className="text-secondary font-semibold text-sm">
            Write article
          </span>
        </div>
      </div>
    </div>
  );
};

export default StartNewPost;
