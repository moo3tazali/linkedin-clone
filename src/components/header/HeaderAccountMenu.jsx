import {
  Avatar,
  Menu,
  MenuItem,
  ArrowDropDownIcon,
  PopupState,
  bindTrigger,
  bindMenu,
} from "../../imports/import";
import { handleLogOut } from "../../hooks/handleAuth";
import { HeaderClasses } from "../../imports/styleClasses";

import { useSelector } from "react-redux";
import ProfileCard from "../ProfileCard";

export default function HeaderAccountMenu() {
  const { name, avatar } = useSelector((state) => state.userData);

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <>
          <div
            className={`cursor-pointer ${HeaderClasses.nav}`}
            {...bindTrigger(popupState)}
          >
            <Avatar
              alt={name}
              src={avatar}
              sx={{
                width: 24,
                height: 24,
                marginBottom: "-3px",
                marginLeft: "-6px",
              }}
            />
            <div className="items-center justify-center hidden ss:flex">
              <span className="text-xs font-medium -mr-1">Me</span>
              <ArrowDropDownIcon />
            </div>
          </div>
          <Menu
            {...bindMenu(popupState)}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 60,
                  height: 60,
                  ml: -0.5,
                  mr: 1,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={popupState.close}>
              <ProfileCard showName showTitle />
            </MenuItem>
            <MenuItem onClick={() => handleLogOut()} className="text-secondary">
              Sign Out
            </MenuItem>
          </Menu>
        </>
      )}
    </PopupState>
  );
}
