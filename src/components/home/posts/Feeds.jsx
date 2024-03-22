/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import { getUserToken } from "../../auth/handleAuth";
import Posts from "./Posts";
import StartNewPost from "./StartNewPost";
import axios from "axios";

const Feeds = () => {
  const [posts, setPosts] = useState([]);

  const userToken = getUserToken();

  let cancelAxios = null;

  useEffect(() => {
    axios
      .get("http://localhost:1337/api/get-posts", {
        headers: {
          Authorization: "Bearer " + userToken,
        },
        cancelToken: new axios.CancelToken((c) => {
          cancelAxios = c;
        }),
      })
      .then((response) => setPosts(response.data.data.results))
      .catch(() => "");

    return () => {
      cancelAxios();
    };
  }, []);

  const showPosts = posts.map((post) => {
    if (post.media != null) {
      const postId = post.id;
      const creatorName = post.creator.fullName;
      const creatorTitle = post.creator.title;
      const creatorProfilePic = post.creator.profilePic.url;
      const postContent = post.text;
      const postMedia = post.media.map((img) => img.url);
      const postLikes = post.likes;

      return (
        <Posts
          key={postId}
          creatorName={creatorName}
          creatorTitle={creatorTitle}
          creatorAvatar={creatorProfilePic}
          postContent={postContent}
          postMedia={postMedia[0]}
          postLikes={postLikes}
          postComments={0}
          postReposts={0}
        />
      );
    } else {
      const postId = post.id;
      const creatorName = post.creator.fullName;
      const creatorTitle = post.creator.title;
      const creatorProfilePic = post.creator.profilePic.url;
      const postContent = post.text;
      const postLikes = post.likes;

      return (
        <Posts
          key={postId}
          creatorName={creatorName}
          creatorTitle={creatorTitle}
          creatorAvatar={creatorProfilePic}
          postContent={postContent}
          postMedia={""}
          postLikes={postLikes}
          postComments={0}
          postReposts={0}
        />
      );
    }
  });
  return (
    <div className="md:col-span-6 col-span-8">
      <StartNewPost />

      <hr className="mt-4 border-gray-300" />

      {showPosts}
    </div>
  );
};

export default Feeds;
