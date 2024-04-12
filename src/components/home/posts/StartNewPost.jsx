import {
  MmsIcon,
  CalendarMonthIcon,
  NewspaperIcon,
} from "../../../imports/import.js";
import NewPostDialog from "./NewPostDialog.jsx";
import { StartNewPostClasses } from "../../../imports/styleClasses.js";
import ProfileCard from "../../ProfileCard.jsx";

const StartNewPost = () => {
  return (
    <div className="bg-white p-3 rounded-lg shadow border border-gray-200">
      <div className="flex items-center gap-3">
        <ProfileCard />
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
