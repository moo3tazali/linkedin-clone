import { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import ProfileCard from "../../ProfileCard";
import { Link } from "react-router-dom";
import axios from "axios";
import { getUserToken } from "../../../hooks/handleAuth";
import { UpdatedAt } from "../../../hooks/UpdatedAt";

const Comments = ({ postId }) => {
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [renderNewComment, setRenderNewComment] = useState(false);

  const userToken = getUserToken();

  useEffect(() => {
    try {
      axios
        .get(`http://localhost:1337/api/posts/${postId}/comments`, {
          headers: { Authorization: "Bearer " + userToken },
        })
        .then((response) => setComments(response.data.data.results));
    } catch (error) {
      console.log(error);
    }
  }, [renderNewComment]);

  const handleAddComment = (e) => {
    e.preventDefault();
    axios
      .post(
        `http://localhost:1337/api/comments`,
        { text: commentInput, postId },
        { headers: { Authorization: "Bearer " + userToken } }
      )
      .then((res) => {
        const response = res.data;
        setRenderNewComment((state) => !state);
        setCommentInput("");
      });
  };
  return (
    <div className="px-4 py-4">
      {/* COMMENT FORM */}
      <div className="flex items-start">
        <ProfileCard avatarWidth={40} />
        <form className="flex-1">
          <input
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            type="text"
            placeholder="Add a comment..."
            className="w-full rounded-full px-4 py-2 border outline-gray-400"
          />
          <button
            onClick={handleAddComment}
            className={`font-semibold bg-primary text-white px-3 py-[2px] rounded-full mt-3 ${
              commentInput ? "" : "hidden"
            }`}
          >
            Post
          </button>
        </form>
      </div>
      {/* COMMENTS */}
      {comments.map((comment) => (
        <div key={comment.id} className="mt-6 flex items-start gap-2">
          <div>
            <Link to={`/in/${comment.user.username}`}>
              <Avatar
                alt={comment.user.username}
                src={comment.user.profilePic || "/static/images/avatar/1.jpg"}
                sx={{ width: 40, height: 40 }}
                className="outline outline-white"
              />
            </Link>
          </div>

          <div className="flex-1 bg-background p-2 rounded-xl">
            <div className=" flex justify-between items-start ">
              <div>
                <Link to={`/in/${comment.user.username}`}>
                  <h4 className="font-semibold mt-3 hover:underline w-fit inline text-sm">
                    {comment.user.fullName || comment.title.username}
                  </h4>
                  <p className={`text-xs text-secondary`}>
                    {comment.user.title || ""}
                  </p>
                </Link>
              </div>
              <div className="text-secondary text-xs ">
                {UpdatedAt(comment.updatedAt)}
              </div>
            </div>
            <p className="break-word text-linkedBlack my-2">
              {expanded ? comment.text : comment.text.substring(0, 150)}
              {comment.text.length > 150 && (
                <button
                  className={`px-2 pt-2 font-semibold text-sm text-secondary ${
                    expanded ? "hidden" : ""
                  }`}
                  onClick={setExpanded((s) => !s)}
                >
                  {expanded ? "" : "...See more"}
                </button>
              )}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
