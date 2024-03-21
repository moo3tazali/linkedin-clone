import Posts from "./Posts";
import StartNewPost from "./StartNewPost";

const Feeds = () => {
  return (
    <div className="md:col-span-6 col-span-8">
      
      <StartNewPost />

      <hr className="mt-4 border-gray-300" />

      <Posts />
      <Posts />
      <Posts />
    </div>
  );
};

export default Feeds;
