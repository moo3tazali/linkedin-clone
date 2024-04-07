import ProfileCard from "./SideBarProfileCard";
import SidebarBody from "./SidebarBody";

const Sidebar = () => {
  return (
    <div className="md:col-span-3 sm:col-span-4">
      <ProfileCard />

      <SidebarBody />
    </div>
  );
};

export default Sidebar;
