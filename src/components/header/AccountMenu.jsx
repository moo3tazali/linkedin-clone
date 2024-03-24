import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { useEffect, useState } from "react";
import { handleLogOut } from "../auth/handleAuth";
import { getUserData } from "../getUserData";

export default function AccountMenu({ navclass }) {
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
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <>
          <div
            className={`cursor-pointer ${navclass}`}
            {...bindTrigger(popupState)}
          >
            <Avatar
              alt={user.name}
              src={user.avatar}
              sx={{
                width: 24,
                height: 24,
                marginBottom: "-3px",
                marginLeft: "-6px",
              }}
            />
            <div className="flex items-center justify-center hidden ss:block">
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
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={popupState.close}>Profile</MenuItem>
            <MenuItem onClick={popupState.close}>My account</MenuItem>
            <MenuItem onClick={()=> handleLogOut()}>Logout</MenuItem>
          </Menu>
        </>
      )}
    </PopupState>
  );
}
