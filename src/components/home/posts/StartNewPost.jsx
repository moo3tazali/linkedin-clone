import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Avatar,
  MmsIcon,
  CalendarMonthIcon,
  NewspaperIcon,
} from "../../../imports/import.js";
import NewPostDialog from "./NewPostDialog.jsx";
import { StartNewPostClasses } from "../../../imports/styleClasses.js";
import { handleUserDataApi } from "../../../store/features/userDataSlice.js";

const StartNewPost = () => {
  const dispatch = useDispatch();
  const { name, avatar } = useSelector((state) => state.userData);

  useEffect(() => {
    dispatch(handleUserDataApi());
  }, []);

  return (
    <div className="bg-white p-3 rounded-lg shadow border border-gray-200">
      <div className="flex items-center gap-3">
        <Avatar
          alt={name}
          src={avatar}
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
