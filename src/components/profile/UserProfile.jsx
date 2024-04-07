import Header from "../header/Header";
import ProfileCard from "./ProfileCard";

const UserProfile = () => {
  return (
    <>
      <Header />

      <div className="container mx-auto sm:grid grid-cols-12 gap-6 mt-5 px-1 ss:px-10 max-w-[1200px] items-start">
        <ProfileCard />
      </div>
    </>
  );
};

export default UserProfile;
