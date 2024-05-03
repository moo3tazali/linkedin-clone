import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { handleUserDataApi } from "../../store/features/userDataSlice";
import { CircularProgress, Avatar, Dialog } from "../../imports/import";
import {
  useDeleteProfilePic,
  useUpdateProfilePic,
} from "../../services/queries";

const UpdateProfilePic = ({ currentProfile }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [open, setOpen] = useState(false);
  const profileIconRef = useRef();
  const dispatch = useDispatch();

  const { isPending, mutateAsync: updateProfilePicMutate } =
    useUpdateProfilePic();
  const { mutateAsync: deleteProfilePicMutate } = useDeleteProfilePic();

  // UPDATE PROFILE PICTURE
  const handleUpdateProfilePic = async () => {
    const formData = new FormData();
    formData.append("profilePic", profilePic);
    await updateProfilePicMutate(formData);
    setProfilePic(null);
    dispatch(handleUserDataApi());

    setOpen(false);
  };

  // DELETE PROFILE PICTURE
  const handleDeleteProfilePic = async () => {
    await deleteProfilePicMutate();
    setProfilePic(null);
    dispatch(handleUserDataApi());

    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex justify-start -mt-[60px]"
      >
        <Avatar
          alt={currentProfile.userName}
          src={currentProfile.avatar}
          sx={{ width: 120, height: 120 }}
          className="outline outline-white"
        />
      </button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth={true}
        maxWidth="md"
      >
        <div className={`flex justify-between items-center p-4 bg-[#1B1F23]`}>
          <div className="text-xl font-semibold text-white">Profile photo</div>
          <button
            onClick={() => setOpen(false)}
            className="font-semibold transition duration-300 hover:bg-gray-200 text-gray-600 text-2xl rounded-full w-11 h-11 flex items-center justify-center"
          >
            X
          </button>
        </div>

        <div className="w-full bg-[#1B1F23] pb-10 pt-4 flex items-center justify-center relative">
          <input
            type="file"
            className="hidden"
            accept="image/*"
            ref={profileIconRef}
            onChange={(e) => setProfilePic(e.target.files[0])}
          />
          <Avatar
            alt={currentProfile.userName}
            src={
              profilePic
                ? URL.createObjectURL(profilePic)
                : currentProfile.avatar
            }
            sx={{ width: 280, height: 280 }}
          />
        </div>
        <hr className="border-black/80" />

        <div className="flex items-center justify-between p-3 font-semibold bg-[#1B1F23] ">
          <button
            disabled={
              currentProfile.avatar === "/static/images/avatar/1.jpg" && true
            }
            onClick={handleDeleteProfilePic}
            className="text-white transition-all hover:text-white/80 hover:bg-background/20 py-1 px-2 rounded disabled:cursor-not-allowed disabled:text-white/50 disabled:hover:bg-transparent disabled:hover:text-white/50"
          >
            Delete photo
          </button>
          <div className="flex gap-3 items-center">
            {isPending ? (
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
      </Dialog>
    </>
  );
};

export default UpdateProfilePic;
