import { ThumbUpIcon, ThumbUpOffAltIcon } from '../../../../imports/import';
import { PostsClasses } from '../../../../imports/styleClasses';
import { useToggleLike } from '../../../../hooks/queries';
import { useState } from 'react';

const LikeBtn = ({ postId, isLiked }) => {
  const [like, setLike] = useState(isLiked);
  const { mutate: toggle, isPending } = useToggleLike();

  function handleLikeClicked() {
    setLike((like) => !like);
    toggle(postId);
  }

  return (
    <>
      <button
        disabled={isPending}
        onClick={handleLikeClicked}
        className={`${PostsClasses.button} ${
          like ? 'text-primary' : 'text-secondary'
        }`}
      >
        {like ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
        <span className='ss:block hidden'>Like</span>
      </button>
    </>
  );
};

export default LikeBtn;
