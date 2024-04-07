import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { useEffect, useState } from "react";
import { handleLogOut } from "../../hooks/handleAuth";
import { getUserData } from "../../hooks/getUserData";
import { Link } from "react-router-dom";

export default function AccountMenu({ navclass }) {
  const [user, setUser] = useState({
    name: "",
    avatar: "/static/images/avatar/1.jpg",
    title: "",
    userName: "",
  });

  useEffect(() => {
    getUserData().then((data) => {
      const { name, avatar, title, userName } = data;
      setUser({
        ...user,
        name,
        avatar,
        title,
        userName,
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
              <Link
                to={`in/${user.userName}`}
                className="flex items-center border-b pb-2"
              >
                <Avatar
                  alt={user.name}
                  src={user.avatar}
                  sx={{ width: 70, height: 70 }}
                  className="outline outline-white"
                />

                <div>
                  <h4 className="font-semibold">{user.name}</h4>
                  <p className="text-xs">{user.title}</p>
                </div>
              </Link>
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
