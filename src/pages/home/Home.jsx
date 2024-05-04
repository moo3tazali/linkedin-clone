import Sidebar from "./components/sidebar/Sidebar";
import Feeds from "./components/feeds/Feeds";
import Widgets from "./components/widgets/Widgets";
import StartNewPost from "./components/feeds/StartNewPost";

const Home = () => {
  return (
    <>
      <div className="container mx-auto sm:grid grid-cols-12 gap-6 mt-5 px-1 ss:px-10 max-w-[1200px] items-start">
        <Sidebar />
        <div className="md:col-span-6 col-span-8">
          <StartNewPost />
          <hr className="mt-4 border-gray-300" />
          <Feeds />
        </div>
        <Widgets />
      </div>
    </>
  );
};

export default Home;
