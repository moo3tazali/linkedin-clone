/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import PopupMenu from './PopupMenu';
import { PostsClasses } from '../../../../imports/styleClasses';
import {
  Avatar,
  IconButton,
  CloseIcon,
  PublicIcon,
  CommentOutlinedIcon,
  RepeatIcon,
  SendIcon,
  FiberManualRecordIcon,
} from '../../../../imports/import';
import { PostLikes } from './PostLikes';
import { momentFromX } from '../../../../utils/momentFromX';
import { useDeletePost } from '../../../../hooks/queries';
import { checkInputDirection } from '../../../../utils/checkInputDirection';
import PostIMGs from './PostIMGs';
import LikeBtn from './LikeBtn';
import Comments from './Comments';

const Posts = ({ post }) => {
  const [expanded, setExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const {
    id,
    author,
    authorId,
    text,
    media,
    likes,
    comments,
    isLiked,
    createdAt,
  } = post;
  const { mutate: deletePostMutate } = useDeletePost();
  const { userId } = useSelector((state) => state.userData);

  const handleDeletePost = (id) => {
    deletePostMutate(id);
  };
  return (
    <>
      <div className={PostsClasses.postBox}>
        {/* POST HEADER */}
        <div className='flex justify-between items-start px-4 pt-4'>
          <div className='flex items-center gap-3'>
            <Link to={`in/${author.user.username}`}>
              <Avatar
                alt={author.user.username}
                src={author.image || ''}
                sx={{ width: 48, height: 48 }}
                className='outline outline-white'
              />
            </Link>
            <div>
              <Link to={`in/${author.user.username}`}>
                <h1 className='text-sm font-semibold hover:underline'>
                  {author.fullname || author.user.username}
                </h1>
              </Link>
              <h2 className='text-secondary text-xs'>{author.title}</h2>
              <span className='text-xs text-secondary'>
                {momentFromX(createdAt)}
              </span>
              <FiberManualRecordIcon
                sx={{ fontSize: '5px', margin: '0 2px' }}
                className='text-secondary'
              />
              <PublicIcon fontSize='10px' className='text-secondary' />
            </div>
          </div>

          <div className='flex items-center'>
            <PopupMenu />
            {authorId === userId && (
              <IconButton
                onClick={() => handleDeletePost(id)}
                id='demo-customized-button'
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
              >
                <CloseIcon className='text-secondary' />
              </IconButton>
            )}
          </div>
        </div>

        {/* POST CONTENT */}
        <div className='max-w-full my-2'>
          <p
            dir={checkInputDirection(text)}
            className='break-word text-sm text-linkedBlack my-2 px-4'
          >
            {expanded ? text : text.substring(0, 150)}
            {text.length > 150 && (
              <button
                className={`px-2 pt-2 font-semibold text-sm text-secondary ${
                  expanded ? 'hidden' : ''
                }`}
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? '' : '...See more'}
              </button>
            )}
          </p>
          <div className='grid grid-cols-12 gap-1'>
            {media?.map((img) => (
              <div
                key={img.id}
                className={`max-h-[500px] w-full bg-red-300 ${
                  media.length > 1 ? 'col-span-6' : 'col-span-12'
                }`}
              >
                <PostIMGs imageUrl={img.url} />
              </div>
            ))}
          </div>
        </div>

        {/* POST FOOTER */}
        <div className='mt-2'>
          <div className='flex items-center justify-between px-4'>
            <PostLikes postLikes={likes} postId={id} />
            <div className='text-xs text-secondary'>
              <span>{comments} comments</span>
              <FiberManualRecordIcon
                sx={{ fontSize: '5px', margin: '0 4px' }}
                className='text-secondary'
              />
              <span>{0} reposts</span>
            </div>
          </div>

          <div className='flex justify-between items-center mt-1 border-t px-2 lg:px-4 py-1'>
            <LikeBtn postId={id} isLiked={isLiked} />
            <button
              onClick={() => setShowComments(true)}
              className={PostsClasses.button}
            >
              <CommentOutlinedIcon />
              <span className='ss:block hidden'>Comment</span>
            </button>
            <button className={PostsClasses.button}>
              <RepeatIcon />
              <span className='ss:block hidden'>Repost</span>
            </button>
            <button className={PostsClasses.button}>
              <SendIcon />
              <span className='ss:block hidden'>Send</span>
            </button>
          </div>
        </div>
        {/* POST COMMENTS */}
        <div className={showComments ? 'block' : 'hidden'}>
          <Comments postId={id} />
        </div>
      </div>
    </>
  );
};

export default Posts;
