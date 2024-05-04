import { Navigate } from "react-router-dom";
import LoadingPage from "../loaders/LoadingPage";
const RedirectCover = ({ next = "/", loggedOut = true }) => {
  return (
    <>
      <LoadingPage />
      {loggedOut && <Navigate to={next?.toString()} />}
    </>
  );
};

export default RedirectCover;
