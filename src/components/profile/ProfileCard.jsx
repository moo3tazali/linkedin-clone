import {
  Avatar,
  Tooltip,
  CloseIcon,
  NoPhotographyIcon,
  DoneIcon,
  CameraAltIcon,
} from "../../imports/import";
import { getUserToken } from "../../hooks/handleAuth";
import { handleUserDataApi } from "../../store/features/userDataSlice";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const ProfileCard = () => {
  const [coverPic, setCoverPic] = useState(null);
  const coverIconRef = useRef();
  const userToken = getUserToken();
  const dispatch = useDispatch();
  const { name, title, avatar, cover, coverId, userId, userName, isLoading } =
    useSelector((state) => state.userData);

  useEffect(() => {
    dispatch(handleUserDataApi());
  }, []);

  const handleOnChange = (e) => {
    setCoverPic(e.target.files[0]);
  };

  const handleUpdateCoverPic = async () => {
    const formData = new FormData();
    formData.append("coverPic", coverPic);
    await axios
      .put("http://localhost:1337/api/user/me", formData, {
        headers: { Authorization: "Bearer " + userToken },
      })
      .then((res) => {
        console.log(res.data);
        setCoverPic(null);
      });
  };

  const handleDeleteCoverPic = async () => {
    const formData = new FormData();
    formData.append("coverPic", "");
    await axios
      .put("http://localhost:1337/api/user/me", formData, {
        headers: { Authorization: "Bearer " + userToken },
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  const handleUpdateProfilePic = async () => {};
  return (
    <div className="col-span-9 bg-white rounded-lg w-full overflow-hidden border border-gray-200  shadow">
      <div className=" relative">
        <img
          src={coverPic ? URL.createObjectURL(coverPic) : cover}
          alt="cover"
          className="w-full object-cover max-h-[150px] sm:max-h-[200px]"
        />
        <div
          onClick={() => coverIconRef.current.click()}
          className={`text-primary absolute top-5 shadow flex justify-center items-center right-5 bg-white w-7 h-7 rounded-full cursor-pointer ${
            coverPic ? "hidden" : ""
          }`}
        >
          <Tooltip title="Change" placement="left">
            <CameraAltIcon fontSize="small" />
          </Tooltip>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            ref={coverIconRef}
            onChange={handleOnChange}
          />
        </div>
        <div
          className={`absolute text-primary top-5 right-5 gap-2 flex-col ${
            coverPic ? "flex" : "hidden"
          }`}
        >
          <CloseIcon
            onClick={() => setCoverPic(null)}
            fontSize="large"
            className="bg-white  p-2 rounded-full cursor-pointer shadow"
          />
          <DoneIcon
            onClick={handleUpdateCoverPic}
            fontSize="large"
            className="bg-white  p-2 rounded-full cursor-pointer shadow"
          />
        </div>
        <Tooltip title="Remove" placement="left">
          <div
            onClick={handleDeleteCoverPic}
            className={`text-red-500 absolute top-14 shadow flex justify-center items-center right-5 bg-white w-7 h-7 rounded-full cursor-pointer ${
              cover ? "" : "hidden"
            }`}
          >
            <NoPhotographyIcon fontSize="small" />
          </div>
        </Tooltip>
      </div>
      <div className="px-5 pb-5">
        <div className="flex justify-start -mt-[60px]">
          <Avatar
            onClick={handleUpdateProfilePic}
            alt={name}
            src={avatar}
            sx={{ width: 120, height: 120 }}
            className="outline outline-white"
          />
        </div>
        <h1 className="font-semibold mt-3 text-2xl">{name}</h1>
        <p className="mb-3">{title}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
