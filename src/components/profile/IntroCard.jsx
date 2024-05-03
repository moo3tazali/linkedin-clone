/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import UpdateCoverPic from "./UpdateCoverPic";
import UpdateProfilePic from "./UpdateProfilePic";
import { useProfile } from "../../services/queries";
import EditIntro from "./EditIntro";

const IntroCard = () => {
  const { userId } = useSelector((state) => state.userData);
  const location = useLocation();
  const currentPath = location.pathname.split("/").pop();
  const { data: users } = useProfile();

  const defaultCoverPic =
    "https://res.cloudinary.com/dlpkoketm/image/upload/v1711390852/Screenshot_2024_03_25_201913_1babd8460d.png";

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
                  <UpdateProfilePic
                    currentProfile={{
                      avatar:
                        user.profilePic?.url || "/static/images/avatar/1.jpg",
                      userName: user.username,
                    }}
                  />
                  <h1 className="font-semibold mt-3 text-2xl">
                    {user.fullName || user.username}
                  </h1>
                  <p className="mb-3">{user.title || ""}</p>
                </div>
                <EditIntro user={user} />
              </div>
            </div>
          )
      )}
    </>
  );
};

export default IntroCard;
