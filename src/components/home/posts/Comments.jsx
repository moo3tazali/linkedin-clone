import { useState } from "react";
import { Avatar, CircularProgress } from "../../../imports/import";
import ProfileCard from "../../ProfileCard";
import { Link } from "react-router-dom";
import { shortMomentFromX } from "../../../hooks/momentFromX";
import { useComments, useCreateComment } from "../../../services/queries";
import { useForm } from "react-hook-form";

const Comments = ({ postId }) => {
  const [expanded, setExpanded] = useState(false);
  const { register, handleSubmit, watch, reset } = useForm();
  const { data: comments } = useComments(postId);
  const { isPending, mutate } = useCreateComment();

  // HANDLERS
  const handleAddComment = (data) => {
    const commentDataToPost = { ...data, postId };
    mutate(commentDataToPost);
    reset();
  };

  return (
    <div className="px-4 py-4">
      {/* COMMENT FORM */}
      <div className="flex items-start">
        <ProfileCard avatarWidth={40} />
        <form onSubmit={handleSubmit(handleAddComment)} className="flex-1">
          <input
            {...register("text")}
            type="text"
            placeholder="Add a comment..."
            className="w-full rounded-full px-4 py-2 border outline-gray-400"
          />
          <button
            type="submit"
            className={`flex items-center justify-center font-semibold bg-primary text-white px-3 py-[2px] rounded-full mt-3 ${
              watch("text") || isPending ? "" : "hidden"
            }`}
            disabled={isPending}
          >
            {isPending ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Post"
            )}
          </button>
        </form>
      </div>
      {/* COMMENTS */}
      {comments?.map((comment) => (
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
                {shortMomentFromX(comment.updatedAt)}
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
