import logo from "../../assets/logo.png";
import "./style.css";
const LoadingPage = () => {
  return (
    <div className="loading-screen">
      <div className="loading-animation">
        <img src={logo} alt="logo" className="logo" />
        <div className="loading-bar" />
      </div>
    </div>
  );
};

export default LoadingPage;
