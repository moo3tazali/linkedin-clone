import { Avatar } from "@mui/material";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { handleUserDataApi } from "../store/features/userDataSlice";

const ProfileCard = ({
  showCover = false,
  showName = false,
  showTitle = false,
  avatarWidth = 48,
}) => {
  const dispatch = useDispatch();
  const { name, avatar, title, cover, userName } = useSelector(
    (state) => state.userData
  );

  useEffect(() => {
    dispatch(handleUserDataApi());
  }, [avatar, cover, title, name]);

  return (
    <>
      <div className={showCover ? "block" : "hidden"}>
        <img src={cover} alt="cover" className="w-full object-contain" />
      </div>
      <div
        className={showCover ? "" : "flex items-center justify-center gap-3"}
      >
        <div className={`w-fit mx-auto ${showCover ? "-mt-7" : ""}`}>
          <Link to={`/in/${userName}`}>
            <Avatar
              alt={name}
              src={avatar}
              sx={{ width: avatarWidth, height: avatarWidth }}
              className="outline outline-white"
            />
          </Link>
        </div>
        <div className={showCover ? "text-center mx-auto" : ""}>
          <Link to={`/in/${userName}`} className={showName ? "" : "hidden"}>
            <h4 className="font-semibold mt-3 hover:underline w-fit inline">
              {name}
            </h4>
          </Link>
          <p className={`text-xs ${showTitle ? "block" : "hidden"}`}>{title}</p>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
