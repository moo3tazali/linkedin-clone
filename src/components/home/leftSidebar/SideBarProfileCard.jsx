import { Avatar } from "@mui/material";
import { handleUserDataApi } from "../../../store/features/userDataSlice";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const SideBarProfileCard = () => {
  const dispatch = useDispatch();
  const { name, avatar, title, cover } = useSelector((state) => state.userData);

  useEffect(() => {
    dispatch(handleUserDataApi());
  }, []);

  return (
    <div className="card bg-white rounded-t-lg w-full overflow-hidden border border-gray-200 sm:border-b-0 shadow">
      <img src={cover} alt="cover" className="w-full object-contain" />
      <div className="flex justify-center -mt-7">
        <Avatar
          alt={name}
          src={avatar}
          sx={{ width: 70, height: 70 }}
          className="outline outline-white"
        />
      </div>
      <h4 className="text-center font-semibold mt-3">{name}</h4>
      <p className="text-center px-2 text-xs mb-3">{title}</p>
      <hr />
    </div>
  );
};

export default SideBarProfileCard;
