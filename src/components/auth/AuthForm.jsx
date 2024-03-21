import { Link } from "react-router-dom";
import { AuthFormClasses } from "../styleClasses";
import { CircularProgress } from "@mui/material";
import logo from "../../assets/LI-Logo.png";

const AuthForm = ({
  form,
  isLoading,
  handleOnChangeInputs,
  handleOnChangeCheckbox,
  handleSubmit,
  heading,
  buttonName,
  spanText,
  linkText,
  goTo,
  toShow = false,
}) => {
  return (
    <div className="p-4 rounded-lg relative">
      <Link to="/">
        <img
          src={logo}
          alt="logo"
          className="max-w-[135px] py-5 absolute mx-5"
        />
      </Link>
      <div className={AuthFormClasses.box}>
        <h1 className="text-2xl font-semibold text-center mb-4 dark:text-gray-200">
          {heading}
        </h1>
        <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
          <form action="#">
            <div className={`mb-4 ${toShow ? "" : "hidden"}`}>
              <label htmlFor="userName" className={AuthFormClasses.label}>
                Username
              </label>
              <input
                type="text"
                id="userName"
                className={AuthFormClasses.input}
                placeholder="Enter your username"
                required
                value={form.userName}
                onChange={(e) => handleOnChangeInputs(e)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className={AuthFormClasses.label}>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className={AuthFormClasses.input}
                placeholder="your@email.com"
                required
                value={form.email}
                onChange={(e) => handleOnChangeInputs(e)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className={AuthFormClasses.label}>
                Password
              </label>
              <input
                type="password"
                id="password"
                className={AuthFormClasses.input}
                placeholder="Enter your password"
                required
                value={form.password}
                onChange={(e) => handleOnChangeInputs(e)}
              />
              <div
                className={`flex items-center mt-1 ${toShow ? "hidden" : ""}`}
              >
                <input
                  type="checkbox"
                  id="isRemembered"
                  className={AuthFormClasses.checkbox}
                  defaultChecked={form.isRemembered}
                  onChange={(e) => handleOnChangeCheckbox(e)}
                />
                <label
                  htmlFor="isRemembered"
                  className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>
              <p className={AuthFormClasses.p}>
                By clicking Agree & Join, you agree to the LinkedIn User
                Agreement, Privacy Policy, and Cookie Policy.
              </p>
            </div>

            <button
              onClick={handleSubmit}
              type="submit"
              className={AuthFormClasses.button}
            >
              {isLoading ? (
                <CircularProgress sx={{ color: "white" }} size={20} />
              ) : (
                ""
              )}

              <span>{buttonName}</span>
            </button>
            <div className="flex justify-center items-center mt-4 gap-1">
              <span>{spanText}</span>
              <Link to={goTo}>
                <span className={AuthFormClasses.span}>{linkText}</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
