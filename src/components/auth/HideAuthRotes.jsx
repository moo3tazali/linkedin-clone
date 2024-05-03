import { getUserToken } from "../../hooks/handleAuth";
import { Outlet, Navigate } from "react-router-dom";

const auth = getUserToken();
const HideAuthRotes = () => (auth ? <Navigate to="/" /> : <Outlet />);


export const Protector = ({ Component, errorRoute }) => {
    const auth = getUserToken();
    return auth ? <Component /> :  <RedirectCover next={errorRoute} />;
}
export const ProtectorNotAuth = ({ Component, errorRoute }) => {
    const auth = getUserToken();
    return !auth ? <Component /> : <RedirectCover next={errorRoute} />;
};

export default HideAuthRotes;
