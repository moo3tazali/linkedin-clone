import { Fragment, useState } from "react";

import { useLikes } from "../../../services/queries";
import WhoLikePost from "./WhoLikePost";
import { ThumbUpOffAltIcon, Avatar, Dialog } from "../../../imports/import";

export const PostLikes = ({ postLikes, postId }) => {
  const [open, setOpen] = useState(false);
  const { data: likes, error } = useLikes(postId);

  return (
    <>
      <button
        disabled={!postLikes}
        onClick={() => setOpen(true)}
        className="flex items-center gap-1 cursor-pointer hover:text-primary hover:underline"
      >
        <Avatar sx={{ bgcolor: "#0A66C2", width: 14, height: 14 }}>
          <ThumbUpOffAltIcon sx={{ fontSize: "10px" }} />
        </Avatar>
        <span className="text-xs text-secondary">{postLikes}</span>
      </button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth={true}
        maxWidth="sm"
      >
        <div className="flex justify-between items-center py-1 px-4">
          <span className=" font-semibold text-lg">Reactions</span>
          <button
            onClick={() => setOpen(false)}
            className="font-semibold transition duration-300 hover:bg-gray-200 text-gray-600 text-xl rounded-full w-11 h-11 flex items-center justify-center"
          >
            X
          </button>
        </div>

        <hr className="" />

        {likes?.map((like) => (
          <Fragment key={like.id}>
            <WhoLikePost like={like} error={error} />
          </Fragment>
        ))}
      </Dialog>
    </>
  );
};
