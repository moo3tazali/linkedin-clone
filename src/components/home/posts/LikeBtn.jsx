import { getUserToken } from "../../../hooks/handleAuth";
import { useRender } from "../../../contexts/RenderContext";
import axios from "axios";
import { ThumbUpIcon, ThumbUpOffAltIcon } from "../../../imports/import";
import { PostsClasses } from "../../../imports/styleClasses";

const LikeBtn = ({ postId, isLiked }) => {
  const userToken = getUserToken();
  const { callRender } = useRender();

  function handleLikeClicked(postId) {
    if (!isLiked) {
      axios
        .post(`http://localhost:1337/api/posts/${postId}/likes`, "", {
          headers: { Authorization: "Bearer " + userToken },
        })
        .then(() => {
          callRender();
        });
    }
    if (isLiked) {
      axios
        .delete(`http://localhost:1337/api/likes/${postId}`, {
          headers: { Authorization: "Bearer " + userToken },
        })
        .then(() => {
          callRender();
        });
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
