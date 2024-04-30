import ProfileCard from "../../ProfileCard";
import SidebarBody from "./SidebarBody";

const Sidebar = () => {
  return (
    <div className="md:col-span-3 sm:col-span-4">
      <div className="card bg-white rounded-t-lg w-full overflow-hidden border border-gray-200 sm:border-b-0 shadow">
        <ProfileCard showCover showName showTitle avatarWidth={70} />
        <hr className="mt-3" />
      </div>

      <SidebarBody />
    </div>
  );
};

export default Sidebar;
