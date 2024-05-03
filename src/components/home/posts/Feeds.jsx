/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
import { Fragment, useEffect } from "react";
import Posts from "./Posts";
import PostIsLoading from "../../loaders/PostIsLoading";
import { usePosts } from "../../../services/queries";
import { useInView } from "react-intersection-observer";

const Feeds = () => {
  const {
    data: posts,
    error,
    isError,
    isInitialLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = usePosts();

  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (isInitialLoading) return <PostIsLoading num={3} />;
  if (isError) console.log(error.message);

  return (
    <>
      {posts?.pages.map((group, index) => (
        <Fragment key={index}>
          {group.map((post) => (
            <Fragment key={post.id}>
              <Posts post={post} />
            </Fragment>
          ))}
        </Fragment>
      ))}

      <div ref={ref}>
        {isFetchingNextPage ? (
          <PostIsLoading />
        ) : hasNextPage ? (
          <span className="block w-10/12 text-center border mt-2 border-linkedBlack mx-auto rounded-full font-semibold text-lg">
            Load More 👌
          </span>
        ) : isError ? (
          <span className="block w-10/12 text-center border mt-2 border-linkedBlack mx-auto rounded-full font-semibold text-lg">
            Server Error 🤷‍♂️
          </span>
        ) : (
          <span className="block w-10/12 text-center border mt-2 border-linkedBlack mx-auto rounded-full font-semibold text-lg">
            No more Posts 🤷‍♂️
          </span>
        )}
      </div>
    </>
  );
};

export default Feeds;
