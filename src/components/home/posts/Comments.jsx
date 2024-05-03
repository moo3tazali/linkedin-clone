import { Fragment, useState } from "react";
import {
  Avatar,
  CircularProgress,
  CloseIcon,
  IconButton,
} from "../../../imports/import";
import ProfileCard from "../../ProfileCard";
import { Link } from "react-router-dom";
import { shortMomentFromX } from "../../../hooks/momentFromX";
import {
  useComments,
  useCreateComment,
  useDeleteComment,
} from "../../../services/queries";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const Comments = ({ postId }) => {
  const [expanded, setExpanded] = useState(false);
  const { register, handleSubmit, watch, reset } = useForm();
  const {
    data: comments,
    isPending: isGetCommentsPending,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useComments(postId);
  const { isPending, mutateAsync: createMutate } = useCreateComment();
  const { mutate: deleteMutate } = useDeleteComment();
  const { userId } = useSelector((state) => state.userData);
  // HANDLERS
  const handleAddComment = async (data) => {
    const commentDataToPost = { ...data, postId };
    await createMutate(commentDataToPost);
    reset();
  };

  const handleDeleteComment = async (commentID) => {
    deleteMutate(commentID);
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
      {isGetCommentsPending ? (
        <div className="mt-6 flex items-start gap-2">Loading ... 😁</div>
      ) : isError ? (
        <div className="mt-6 flex items-start gap-2">Server Error. 🤷‍♂️</div>
      ) : (
        comments?.pages.map((group, index) => (
          <Fragment key={index}>
            {group.map((comment) => (
              <div key={comment.id} className="mt-6 flex items-start gap-2">
                <div>
                  <Link to={`/in/${comment.user.username}`}>
                    <Avatar
                      alt={comment.user.username}
                      src={
                        comment.user.profilePic?.url ||
                        "/static/images/avatar/1.jpg"
                      }
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
                          {comment.user?.fullName || comment.user?.username}
                        </h4>
                        <p className={`text-xs text-secondary`}>
                          {comment.user?.title || ""}
                        </p>
                      </Link>
                    </div>
                    <div className="text-secondary text-xs flex flex-col-reverse items-end justify-center gap-1">
                      <span>{shortMomentFromX(comment.updatedAt)}</span>
                      {comment.user.id === userId && (
                        <IconButton
                          onClick={() => handleDeleteComment(comment.id)}
                          id="demo-customized-button"
                          aria-controls={
                            open ? "demo-customized-menu" : undefined
                          }
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                          sx={{ width: "18px", height: "18px" }}
                        >
                          <CloseIcon
                            sx={{ fontSize: "16px" }}
                            className="text-secondary"
                          />
                        </IconButton>
                      )}
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
          </Fragment>
        ))
      )}
      <button
        onClick={fetchNextPage}
        disabled={isFetchingNextPage || !hasNextPage}
        className="font-semibold w-fit px-2 mt-5 text-secondary rounded hover:text-linkedBlack hover:bg-background transition text-sm disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-secondary"
      >
        {isFetchingNextPage
          ? "Loading..."
          : hasNextPage
          ? "Load more comments"
          : "No more comments"}
      </button>
    </div>
  );
};

export default Comments;
