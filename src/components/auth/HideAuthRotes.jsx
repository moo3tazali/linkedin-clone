import { getUserToken } from "../../hooks/handleAuth";
import { Outlet } from "react-router-dom";

const auth = getUserToken();
const HideAuthRotes = () => (auth ? "" : <Outlet />);

export default HideAuthRotes;
