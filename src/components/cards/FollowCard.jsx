import { Avatar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const FollowCard = ({ user }) => {
  const { username, fullName, title, profilePic } = user;
  return (
    <div className="my-3">
      <div className="flex items-center gap-3">
        <Avatar
          alt={username}
          src={profilePic?.url}
          sx={{ width: 48, height: 48 }}
          className="outline outline-white"
        />
        <div>
          <h1 className="text-sm font-semibold">{fullName || username}</h1>
          <h2 className="text-secondary text-xs">{title}</h2>
        </div>
      </div>

      <button className="border mt-2 border-gray-700 text-md font-semibold text-secondary flex items-center justify-start px-4 py-1 rounded-full hover:bg-background hover:border-2 hover:border-gray-600 ml-16 ">
        <AddIcon />
        Follow
      </button>
    </div>
  );
};

export default FollowCard;
