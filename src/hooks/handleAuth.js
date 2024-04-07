import Cookies from "js-cookie";

// STORE USER IN COOKIES
export const storeUser = (token, isRemembered) => {
  Cookies.set("user", token, {
    expires: isRemembered ? 30 : 2,
    secure: true,
    sameSite: "Strict",
    path: "/",
  });
};

// GET USER FROM COOKIES
export const getUserToken = () => {
  return Cookies.get("user") || "";
};

// HANDLE LOGOUT
export const handleLogOut = () => {
  Cookies.remove("user");
  location.pathname = "/";
};

// handleLogOut()
