import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/home/Home";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import PrivateRoutes from "./components/auth/PrivateRoutes";
import HideAuthRotes from "./components/auth/HideAuthRotes";
import { RenderProvider } from "./components/RenderContext";
import UserProfile from "./components/profile/UserProfile";
function App() {
  return (
    <>
      <RenderProvider>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/in/:userName" element={<UserProfile />} />
          </Route>
          <Route element={<HideAuthRotes />}>
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </RenderProvider>
    </>
  );
}

export default App;
