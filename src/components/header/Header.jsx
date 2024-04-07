import {
  LinkedInIcon,
  SearchIcon,
  HomeIcon,
  PeopleAltIcon,
  WorkIcon,
  TextsmsRoundedIcon,
  Badge,
  NotificationsIcon,
} from "../../imports/import";
import { HeaderClasses } from "../../imports/styleClasses";
import HeaderAccountMenu from "./HeaderAccountMenu";

import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className=" bg-white rounded-t-2xl p-1 shadow sticky top-0 z-50">
      <div className="flex md:justify-between justify-center items-center container mx-auto max-w-[1200px]">
        <div className="flex items-center">
          <Link to="/">
            <LinkedInIcon
              className="text-primary"
              style={{ fontSize: "50px" }}
            />
          </Link>
          <div className="hidden md:block relative">
            <SearchIcon
              className="absolute left-2 top-[8px] text-linkedBlack"
              style={{ fontSize: "20px" }}
            />
            <input
              type="search"
              placeholder="Search"
              className="bg-[#EDF3F8] px-[40px] py-[6px] lg:min-w-[280px] rounded outline-none placeholder:text-sm placeholder:text-linkedBlack"
            />
          </div>
          <div
            className={`md:hidden block ${HeaderClasses.nav} cursor-pointer`}
          >
            <SearchIcon style={{ fontSize: "30px", marginBottom: "-3px" }} />
            <span className="text-xs font-medium hidden ss:block">Search</span>
          </div>
        </div>

        <nav className="flex items-center py-1">
          <NavLink to="/" className={HeaderClasses.nav}>
            <HomeIcon style={{ fontSize: "30px", marginBottom: "-3px" }} />
            <span className="text-xs font-medium hidden ss:block">Home</span>
          </NavLink>
          <NavLink to="mynetwork" className={HeaderClasses.nav}>
            <PeopleAltIcon style={{ fontSize: "30px", marginBottom: "-3px" }} />
            <span className="text-xs font-medium hidden ss:block">
              My Network
            </span>
          </NavLink>
          <NavLink to="jobs" className={HeaderClasses.nav}>
            <WorkIcon style={{ fontSize: "30px", marginBottom: "-3px" }} />
            <span className="text-xs font-medium hidden ss:block">Jobs</span>
          </NavLink>
          <NavLink to="messaging" className={HeaderClasses.nav}>
            <TextsmsRoundedIcon
              style={{ fontSize: "30px", marginBottom: "-3px" }}
            />
            <span className="text-xs font-medium hidden ss:block">
              Messaging
            </span>
          </NavLink>
          <NavLink to="notifications" className={HeaderClasses.nav}>
            <Badge badgeContent={2} color="error" overlap="circular">
              <NotificationsIcon
                style={{ fontSize: "30px", marginBottom: "-3px" }}
              />
            </Badge>
            <span className="text-xs font-medium hidden ss:block">
              Notifications
            </span>
          </NavLink>

          <HeaderAccountMenu />
        </nav>
      </div>
    </header>
  );
};

export default Header;
