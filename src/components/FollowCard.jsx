import { Avatar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const FollowCard = ({ name, pic, title }) => {
  return (
    <div className="my-3">
      <div className="flex items-center gap-3">
        <Avatar
          alt={name}
          src={pic}
          sx={{ width: 48, height: 48 }}
          className="outline outline-white"
        />
        <div>
          <h1 className="text-sm font-semibold">{name}</h1>
          <h2 className="text-secondary text-xs">{title}</h2>
        </div>
      </div>

      <button className="border border-gray-700 text-md font-semibold text-secondary flex items-center justify-start px-4 py-1 rounded-full hover:bg-background hover:border-2 hover:border-gray-600 ml-16 ">
        <AddIcon />
        Follow
      </button>
    </div>
  );
};

export default FollowCard;

FollowCard.defaultProps = {
  name: "?",
  pic: "/static/images/avatar/1.jpg",
  title: " ",
};
