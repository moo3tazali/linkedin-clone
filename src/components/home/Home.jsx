import Sidebar from "./Sidebar";
import Feeds from "./posts/Feeds";
import Widgets from "./Widgets";
import Header from "../header/Header";

const Home = () => {
  return (
    <>
      <Header />

      <div className="container mx-auto sm:grid grid-cols-12 gap-6 mt-5 px-1 ss:px-10 max-w-[1200px] items-start">
        <Sidebar />
        <Feeds />
        <Widgets />
      </div>
    </>
  );
};

export default Home;
