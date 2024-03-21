import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/home/Home";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import PrivateRoutes from "./components/auth/PrivateRoutes";
import HideAuthRotes from "./components/auth/HideAuthRotes";
function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<HideAuthRotes />}>
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
