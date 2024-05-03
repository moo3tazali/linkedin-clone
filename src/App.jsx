import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/home/Home";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import PrivateRoutes from "./components/auth/PrivateRoutes";
import HideAuthRotes, { Protector } from "./components/auth/HideAuthRotes";
import UserProfile from "./components/profile/UserProfile";
import FetchUserData from "./hooks/FetchUserData";
import ComingSoon from "./components/ComingSoon";
function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/in/:userName" element={<UserProfile />} />
        </Route>
        {/* <Route element={<HideAuthRotes />}> */}
          <Route path="signup"  element={<ProtectorNotAuth   Component={SignUp}  errorRoute={'/'}  />} />
          <Route path="login"element={<ProtectorNotAuth   Component={Login}  errorRoute={'/'}  />} />
        {/* </Route> */}
        <Route path="*" element={<ComingSoon />} />
      </Routes>
      <FetchUserData />
    </>
  );
}

export default App;
