/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import UpdateCoverPic from "./UpdateCoverPic";
import UpdateProfilePic from "./UpdateProfilePic";
import { useProfile } from "../../../hooks/queries";
import EditIntro from "./EditIntro";
import { Avatar } from "@mui/material";
import defaultCoverPic from "../../../assets/defaultCover.png";

const IntroCard = () => {
  const { userId } = useSelector((state) => state.userData);
  const location = useLocation();
  const currentPath = location.pathname.split("/").pop();
  const { data: users } = useProfile();

  return (
    <>
      {users?.map(
        (user) =>
          user.username === currentPath && (
            <div
              key={user.username}
              className="col-span-9 bg-white rounded-lg w-full overflow-hidden border border-gray-200  shadow"
            >
              <div className=" relative">
                <img
                  src={user.coverPic?.url || defaultCoverPic}
                  alt="cover"
                  className="w-full object-cover max-h-[150px] sm:max-h-[200px]"
                />

                {user.id === userId && (
                  <UpdateCoverPic
                    currentPic={user.coverPic?.url || defaultCoverPic}
                  />
                )}
              </div>
              <div className="flex justify-between">
                <div className="px-5 pb-5 w-fit">
                  {user.id === userId ? (
                    <UpdateProfilePic
                      currentProfile={{
                        avatar: user.profilePic?.url || "",
                        userName: user.username,
                      }}
                    />
                  ) : (
                    <div className="flex justify-start -mt-[60px]">
                      <Avatar
                        alt={user.username}
                        src={user.profilePic?.url || ""}
                        sx={{ width: 120, height: 120 }}
                        className="outline outline-white"
                      />
                    </div>
                  )}

                  <h1 className="font-semibold mt-3 text-2xl">
                    {user.fullName || user.username}
                  </h1>
                  <p className="mb-3">{user.title || ""}</p>
                </div>
                {user.id === userId && <EditIntro />}
              </div>
            </div>
          )
      )}
    </>
  );
};

export default IntroCard;
