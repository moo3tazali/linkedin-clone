import BookmarkIcon from "@mui/icons-material/Bookmark";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

const SidebarBody = () => {
  return (
    <>
      <div className="card bg-white rounded-b-lg w-full overflow-hidden border border-gray-200 border-t-0 shadow">
        <div className="my-3 flex flex-col text-secondary font-[500] text-sm">
          <div className="flex justify-between items-center cursor-pointer px-3 py-1 hover:bg-background transition-all duration-300">
            <span>Profile viewers</span>
            <span className="text-primary">4</span>
          </div>
          <div className="flex justify-between items-center cursor-pointer px-3 py-1 hover:bg-background transition-all duration-300">
            <span>Post impressions</span>
            <span className="text-primary">1</span>
          </div>
        </div>
        <hr />

        <div className="hover:bg-background transition-all duration-300 cursor-pointer text-xs text-secondary py-3">
          <span className="block px-3">
            Strengthen your profile with an Ai writing assistant
          </span>
          <span className="block px-3 pl-9 font-[500] text-linkedBlack relative gold-icon pt-1">
            Reactivate Premium: 50% Off
          </span>
        </div>

        <hr />

        <div className=" text-secondary font-[500] cursor-pointer hover:bg-background transition-all duration-300 px-3 py-3 items-center gap-2 flex">
          <BookmarkIcon />
          <span className=" text-linkedBlack text-md">My items</span>
        </div>
      </div>

      <div className="card bg-white shadow rounded-lg w-full overflow-hidden my-3 border border-gray-200">
        <div className="text-primary font-[500] p-3 flex flex-col gap-4 text-sm">
          <Link to="#" className="hover:underline">
            Groups
          </Link>
          <span className="flex justify-between items-center">
            <Link to="#" className="hover:underline">
              Events
            </Link>
            <AddIcon className="text-linkedBlack rounded-full p-[2px] cursor-pointer hover:bg-background transition-all duration-300" />
          </span>
          <Link to="#" className="hover:underline">
            Followed Hashtags
          </Link>
        </div>
        <hr />

        <div className="text-center p-3 font-[500] text-secondary text-sm hover:bg-background transition-all duration-300 cursor-pointer">
          Discover more
        </div>
      </div>
    </>
  );
};

export default SidebarBody;
