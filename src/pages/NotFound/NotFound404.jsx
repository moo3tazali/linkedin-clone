import { Link } from "react-router-dom";

const NotFound404 = () => {
  return (
    <>
      <div className="h-screen w-full flex items-center justify-center flex-col gap-4 text-primary font-semibold tracking-tighter text-xl">
        Error 404 🤷‍♂️ Not Found Page.
        <Link className="text-secondary" to={"/"}>
          Home Page
        </Link>
      </div>
    </>
  );
};

export default NotFound404;
