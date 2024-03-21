import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import RepeatIcon from "@mui/icons-material/Repeat";
import SendIcon from "@mui/icons-material/Send";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Avatar } from "@mui/material";

const PostFooter = () => {
  const buttonClass =
    "flex items-center space-x-1 text-secondary hover:bg-background px-6 py-3 rounded-md text-sm font-[500]";

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-1">
          <Avatar sx={{ bgcolor: "#0A66C2", width: 14, height: 14 }}>
            <ThumbUpOffAltIcon sx={{ fontSize: "10px" }} />
          </Avatar>
          <span className="text-xs text-secondary">.... and 2,039 others</span>
        </div>
        <div className="text-xs text-secondary">
          <span>438 comments</span>
          <FiberManualRecordIcon
            sx={{ fontSize: "5px", margin: "0 4px" }}
            className="text-secondary"
          />
          <span>539 reposts</span>
        </div>
      </div>

      <div className="flex justify-between items-center mt-1 border-t px-4 py-1">
        <button className={buttonClass}>
          <ThumbUpOffAltIcon />
          <span className="ss:block hidden">Like</span>
        </button>
        <button className={buttonClass}>
          <CommentOutlinedIcon />
          <span className="ss:block hidden">Comment</span>
        </button>
        <button className={buttonClass}>
          <RepeatIcon />
          <span className="ss:block hidden">Repost</span>
        </button>
        <button className={buttonClass}>
          <SendIcon />
          <span className="ss:block hidden">Send</span>
        </button>
      </div>
    </div>
  );
};

export default PostFooter;
