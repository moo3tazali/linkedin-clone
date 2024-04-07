/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { getUserToken } from "../../../hooks/handleAuth";
import { ThumbUpOffAltIcon, Avatar, Dialog } from "../../../imports/import";
import { useRender } from "../../../contexts/RenderContext";
import { Link } from "react-router-dom";

export const PostLikes = ({ postLikes, postId }) => {
  const [postLike, setPostLike] = useState([]);
  const [open, setOpen] = useState(false);
  const { render } = useRender();
  const userToken = getUserToken();

  let cancelAxiox = null;
  useEffect(() => {
    axios
      .get(`http://localhost:1337/api/post-likes/${postId}`, {
        headers: { Authorization: "Bearer " + userToken },
        cancelToken: new axios.CancelToken((c) => {
          cancelAxiox = c;
        }),
      })
      .then((res) => {
        setPostLike(res.data.data.results);
      })
      .catch((err) => err);

    return () => {
      cancelAxiox();
    };
  }, [render]);

  const ShowPostLikes = postLike.map((like) => {
    const fullName = like.user.fullName || like.user.username;
    const userName = like.user.username;
    const userTitle = like.user.title || "";
    const userAvatar = like.user.ProfilePic || "";

    return (
      <Link
        to={`in/${userName}`}
        key={like.id}
        className="flex items-center gap-3 px-6 py-1 cursor-pointer"
      >
        <Avatar
          alt={fullName}
          src={userAvatar}
          sx={{ width: 48, height: 48 }}
          className="outline outline-white"
        />
        <div className=" border-b flex-1 py-4 group">
          <h1 className="text-sm font-semibold">{fullName}</h1>
          <h2 className="text-secondary text-xs group-hover:underline">
            {userTitle}
          </h2>
        </div>
      </Link>
    );
  });
  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="flex items-center gap-1 cursor-pointer hover:text-primary hover:underline"
      >
        <Avatar sx={{ bgcolor: "#0A66C2", width: 14, height: 14 }}>
          <ThumbUpOffAltIcon sx={{ fontSize: "10px" }} />
        </Avatar>
        <span className="text-xs text-secondary">{postLikes}</span>
      </div>

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

        {ShowPostLikes}
      </Dialog>
    </>
  );
};
