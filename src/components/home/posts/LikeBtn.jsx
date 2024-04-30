import { ThumbUpIcon, ThumbUpOffAltIcon } from "../../../imports/import";
import { PostsClasses } from "../../../imports/styleClasses";
import { useAddLike, useRemoveLike } from "../../../services/queries";

const LikeBtn = ({ postId, isLiked }) => {
  const { mutate: add } = useAddLike();
  const { mutate: remove } = useRemoveLike();

  function handleLikeClicked(postId) {
    if (!isLiked) {
      add(postId);
    }
    if (isLiked) {
      remove(postId);
    }
  }

  return (
    <>
      <button
        onClick={() => handleLikeClicked(postId)}
        className={`${PostsClasses.button} ${
          isLiked ? "text-primary" : "text-secondary"
        }`}
      >
        {isLiked ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
        <span className="ss:block hidden">Like</span>
      </button>
    </>
  );
};

export default LikeBtn;
