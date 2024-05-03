import { getUserToken } from "../../hooks/handleAuth";
import { Outlet, Navigate } from "react-router-dom";

const auth = getUserToken();
const HideAuthRotes = () => (auth ? <Navigate to="/" /> : <Outlet />);

export default HideAuthRotes;
