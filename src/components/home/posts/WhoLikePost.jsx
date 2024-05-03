import { Avatar } from "../../../imports/import";
import { Link } from "react-router-dom";

const WhoLikePost = ({ like, error }) => {
  const { user } = like;
  if (error) {
    console.log(error);
    return null;
  }
  return (
    <Link
      to={`/in/${user.username}`}
      className="flex items-center gap-3 px-6 py-1 cursor-pointer"
    >
      <Avatar
        alt={user.username}
        src={user.profilePic?.url || "/static/images/avatar/1.jpg"}
        sx={{ width: 48, height: 48 }}
        className="outline outline-white"
      />
      <div className=" border-b flex-1 py-4 group">
        <h1 className="text-sm font-semibold">
          {user.fullName || user.username}
        </h1>
        <h2 className="text-secondary text-xs group-hover:underline">
          {user.title || ""}
        </h2>
      </div>
    </Link>
  );
};

export default WhoLikePost;
