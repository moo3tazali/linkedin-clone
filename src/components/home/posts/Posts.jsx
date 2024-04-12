/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";

import PopupMenu from "./PopupMenu";
import { PostsClasses } from "../../../imports/styleClasses";
import {
  Avatar,
  IconButton,
  CloseIcon,
  PublicIcon,
  CommentOutlinedIcon,
  RepeatIcon,
  SendIcon,
  FiberManualRecordIcon,
} from "../../../imports/import";
import LikeBtn from "./LikeBtn";
import { PostLikes } from "./PostLikes";
import Comments from "./Comments";

const Posts = ({
  creatorUserName = "",
  creatorName = "",
  creatorTitle = "",
  creatorAvatar = "",
  postContent = "",
  postMedia = "",
  postLikes = 0,
  postComments = 0,
  postReposts = 0,
  date = "",
  postId,
  isLiked,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <div className={PostsClasses.postBox}>
        {/* POST HEADER */}
        <div className="flex justify-between items-start px-4 pt-4">
          <div className="flex items-center gap-3">
            <Link to={`in/${creatorUserName}`}>
              <Avatar
                alt={creatorName}
                src={creatorAvatar}
                sx={{ width: 48, height: 48 }}
                className="outline outline-white"
              />
            </Link>
            <div>
              <Link to={`in/${creatorUserName}`}>
                <h1 className="text-sm font-semibold hover:underline">
                  {creatorName}
                </h1>
              </Link>
              <h2 className="text-secondary text-xs">{creatorTitle}</h2>
              <span className="text-xs text-secondary">{date}</span>
              <FiberManualRecordIcon
                sx={{ fontSize: "5px", margin: "0 2px" }}
                className="text-secondary"
              />
              <PublicIcon fontSize="10px" className="text-secondary" />
            </div>
          </div>

          <div className="flex items-center">
            <PopupMenu />
            <IconButton
              id="demo-customized-button"
              aria-controls={open ? "demo-customized-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <CloseIcon className="text-secondary" />
            </IconButton>
          </div>
        </div>

        {/* POST CONTENT */}
        <div className="max-w-full my-2">
          <p className="break-word text-sm text-linkedBlack my-2 px-4">
            {expanded ? postContent : postContent.substring(0, 150)}
            {postContent.length > 150 && (
              <button
                className={`px-2 pt-2 font-semibold text-sm text-secondary ${
                  expanded ? "hidden" : ""
                }`}
                onClick={toggleExpanded}
              >
                {expanded ? "" : "...See more"}
              </button>
            )}
          </p>

          <img src={postMedia} alt="" className=" max-w-full object-contain" />
        </div>

        {/* POST FOOTER */}
        <div className="mt-2">
          <div className="flex items-center justify-between px-4">
            <PostLikes postLikes={postLikes} postId={postId} />
            <div className="text-xs text-secondary">
              <span>{postComments} comments</span>
              <FiberManualRecordIcon
                sx={{ fontSize: "5px", margin: "0 4px" }}
                className="text-secondary"
              />
              <span>{postReposts} reposts</span>
            </div>
          </div>

          <div className="flex justify-between items-center mt-1 border-t px-2 lg:px-4 py-1">
            <LikeBtn postId={postId} isLiked={isLiked} />
            <button
              onClick={() => setShowComments(true)}
              className={PostsClasses.button}
            >
              <CommentOutlinedIcon />
              <span className="ss:block hidden">Comment</span>
            </button>
            <button className={PostsClasses.button}>
              <RepeatIcon />
              <span className="ss:block hidden">Repost</span>
            </button>
            <button className={PostsClasses.button}>
              <SendIcon />
              <span className="ss:block hidden">Send</span>
            </button>
          </div>
        </div>
        {/* POST COMMENTS */}
        <div className={showComments ? "block" : "hidden"}>
          <Comments postId={postId} />
        </div>
      </div>
    </>
  );
};

export default Posts;
