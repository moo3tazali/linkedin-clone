import { Routes, Route } from "react-router-dom";
import { getUserToken } from "../utils/handleAuth";
import { useFetchUserData } from "../hooks/fetchUserData";
import LoadingPage from "../components/loaders/LoadingPage";
import ComingSoon from "../pages/NotFound/ComingSoon";
import RedirectCover from "../components/redirectCover/RedirectCover";
import Home from "../pages/home/Home";
import Profile from "../pages/profile/Profile";
import SignUp from "../pages/auth/SignUp";
import Login from "../pages/auth/Login";

const AppRoutes = () => {
  const auth = getUserToken();
  const isUserDataFetched = useFetchUserData();
  return isUserDataFetched ? (
    <LoadingPage />
  ) : auth && !isUserDataFetched ? (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/in/:userName" element={<Profile />} />
      <Route path="*" element={<ComingSoon />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="signUp" element={<SignUp />} />
      <Route path="login" element={<Login />} />
      <Route path="*" element={<RedirectCover next="/login" />} />
    </Routes>
  );
};

export default AppRoutes;
