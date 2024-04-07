import LinkedInIcon from "@mui/icons-material/LinkedIn";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import WorkIcon from "@mui/icons-material/Work";
import TextsmsRoundedIcon from "@mui/icons-material/TextsmsRounded";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { NavLink } from "react-router-dom";
import AccountMenu from "./AccountMenu";

const Header = () => {
  const classes = {
    nav: "flex flex-col justify-center items-center text-secondary ss:min-w-[80px] min-w-[48px] min-h-[52px] border-b-2 border-transparent hover:text-linkedBlack transition-all duration-300 pb-1",
  };

  return (
    <header className=" bg-white rounded-t-2xl p-1 shadow sticky top-0 z-50">
      <div className="flex md:justify-between justify-center items-center container mx-auto max-w-[1200px]">
        <div className="flex items-center">
          <LinkedInIcon className="text-primary" style={{ fontSize: "50px" }} />
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
          <div className={`md:hidden block ${classes.nav} cursor-pointer`}>
            <SearchIcon style={{ fontSize: "30px", marginBottom: "-3px" }} />
            <span className="text-xs font-medium hidden ss:block">Search</span>
          </div>
        </div>

        <nav className="flex items-center py-1">
          <NavLink to="/" className={classes.nav}>
            <HomeIcon style={{ fontSize: "30px", marginBottom: "-3px" }} />
            <span className="text-xs font-medium hidden ss:block">Home</span>
          </NavLink>
          <NavLink to="mynetwork" className={classes.nav}>
            <PeopleAltIcon style={{ fontSize: "30px", marginBottom: "-3px" }} />
            <span className="text-xs font-medium hidden ss:block">
              My Network
            </span>
          </NavLink>
          <NavLink to="jobs" className={classes.nav}>
            <WorkIcon style={{ fontSize: "30px", marginBottom: "-3px" }} />
            <span className="text-xs font-medium hidden ss:block">Jobs</span>
          </NavLink>
          <NavLink to="messaging" className={classes.nav}>
            <TextsmsRoundedIcon
              style={{ fontSize: "30px", marginBottom: "-3px" }}
            />
            <span className="text-xs font-medium hidden ss:block">
              Messaging
            </span>
          </NavLink>
          <NavLink to="notifications" className={classes.nav}>
            <Badge badgeContent={2} color="error" overlap="circular">
              <NotificationsIcon
                style={{ fontSize: "30px", marginBottom: "-3px" }}
              />
            </Badge>
            <span className="text-xs font-medium hidden ss:block">
              Notifications
            </span>
          </NavLink>

          <AccountMenu navclass={classes.nav} />
        </nav>
      </div>
    </header>
  );
};

export default Header;
