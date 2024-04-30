/* eslint-disable react/jsx-key */
import { Fragment } from "react";
import Posts from "./Posts";
import PostIsLoading from "../../loaders/PostIsLoading";
import { usePosts } from "../../../services/queries";

const Feeds = () => {
  const { data: posts, error, isError, isLoading } = usePosts();

  if (isLoading) <PostIsLoading num={3} />;
  if (isError) console.log(error.message);

  return (
    <>
      {posts?.map((post) => (
        <Fragment key={post.id}>
          <Posts post={post} />
        </Fragment>
      ))}
    </>
  );
};

export default Feeds;
