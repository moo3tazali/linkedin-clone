import { useRef, useState } from "react";

import { CircularProgress, Avatar } from "../../imports/import";
import { DeleteRequest, PutRequest } from "../../hooks/ApiRequests";
import Modal from "../Modal";

const UpdateProfilePic = ({ currentProfile }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const profileIconRef = useRef();

  // UPDATE PROFILE PICTURE
  const handleUpdateProfilePic = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("profilePic", profilePic);
    const { response, error } = await PutRequest("/api/user/me", formData);
    console.log(response, error);
    setProfilePic(null);
    setIsLoading(false);
  };

  // DELETE PROFILE PICTURE
  const handleDeleteProfilePic = async () => {
    const { response, error } = await DeleteRequest("/api/user/me/profile-pic");
    console.log(response, error);
  };

  return (
    <Modal
      btn={
        <Avatar
          alt={currentProfile.name}
          src={currentProfile.avatar}
          sx={{ width: 120, height: 120 }}
          className="outline outline-white"
        />
      }
      btnStyle={"flex justify-start -mt-[60px]"}
      headerText={"Profile photo"}
      headerTextStyle={"text-xl text-linkedBlack font-semibold text-white"}
      headerStyle={"bg-[#1B1F23]"}
      handleClose={isLoading}
    >
      <div className="w-full bg-[#1B1F23] pb-10 pt-4 flex items-center justify-center relative">
        <input
          type="file"
          className="hidden"
          accept="image/*"
          ref={profileIconRef}
          onChange={(e) => setProfilePic(e.target.files[0])}
        />
        <Avatar
          alt={currentProfile.name}
          src={
            profilePic ? URL.createObjectURL(profilePic) : currentProfile.avatar
          }
          sx={{ width: 280, height: 280 }}
        />
      </div>
      <hr className="border-black/80" />

      <div className="flex items-center justify-between p-3 font-semibold bg-[#1B1F23] ">
        <button
          onClick={handleDeleteProfilePic}
          className="text-white transition-all hover:text-white/80 hover:bg-background/20 py-1 px-2 rounded"
        >
          Delete photo
        </button>
        <div className="flex gap-3 items-center">
          {isLoading ? (
            <CircularProgress sx={{ color: "primary" }} size={30} />
          ) : (
            ""
          )}
          <button
            onClick={() => profileIconRef.current.click()}
            className="text-white border-2 border-white/30 rounded-full px-4 py-1 transition-all hover:border-white/50 hover:text-white-80 hover:border-2"
          >
            Change photo
          </button>
          <button
            onClick={handleUpdateProfilePic}
            className="bg-primary text-white px-4 py-1 rounded-full disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-all hover:bg-primary/70"
          >
            Apply
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UpdateProfilePic;
