import { Navigate } from "react-router-dom";
import "./redirectCover.css";
import Spinner from "../spinner/spinner";
const RedirectCover = ({ next = '/', logeddOut = true }) => {
    return (
        <div className="RedirectCover">
            <Spinner />
            <h1>loading ...</h1>
            {logeddOut ? <Navigate to={next?.toString()} /> : ""}
        </div>
    );
};

export default RedirectCover;
