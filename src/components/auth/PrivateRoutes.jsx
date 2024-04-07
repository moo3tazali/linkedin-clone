import { Navigate, Outlet } from "react-router-dom";
import { getUserToken } from "../../hooks/handleAuth";

const PrivateRoutes = () => {
  const auth = getUserToken();
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
