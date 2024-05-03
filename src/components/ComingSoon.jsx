import { Link } from "react-router-dom";

const ComingSoon = () => {
  return (
    <>
      <div className="h-screen w-full flex items-center justify-center flex-col gap-4 text-primary font-semibold tracking-tighter text-xl">
        Coming soon 😊....
        <Link className="text-secondary" to={"/"}>
          Home Page
        </Link>
      </div>
    </>
  );
};

export default ComingSoon;
