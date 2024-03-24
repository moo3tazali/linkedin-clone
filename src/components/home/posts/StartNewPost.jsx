import { useEffect, useState } from "react";
import NewPostDialog from "./NewPostDialog.jsx";
import { StartNewPostClasses } from "../../styleClasses.js";
import { getUserData } from "../../getUserData.js";
import {
  Avatar,
  MmsIcon,
  CalendarMonthIcon,
  NewspaperIcon,
} from "../../../import.js";

const StartNewPost = () => {
  const [user, setUser] = useState({
    name: "",
    avatar: "/static/images/avatar/1.jpg",
  });

  useEffect(() => {
    getUserData().then((data) => {
      const { name, avatar } = data;
      setUser({
        ...user,
        name,
        avatar,
      });
    });
  }, []);

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
        <div className={StartNewPostClasses.icons}>
          <MmsIcon className="text-primary" />
          <span className="text-secondary font-semibold text-sm">Media</span>
        </div>
        <div className={StartNewPostClasses.icons}>
          <CalendarMonthIcon className="text-[#C37D16]" />
          <span className="text-secondary font-semibold text-sm">Event</span>
        </div>
        <div className={StartNewPostClasses.icons}>
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
