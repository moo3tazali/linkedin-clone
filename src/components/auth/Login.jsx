import { useState } from "react";
import axios from "axios";
import { storeUser } from "../../hooks/handleAuth";
import { useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";

const Login = () => {
  // STATES
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
    isRemembered: false,
  });

  // HANDLE API LOGIN
  async function handleSignInFormSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:1337/api/auth/local",
        {
          identifier: signInForm.email,
          password: signInForm.password,
        }
      );

      const userToken = response.data.jwt;
      storeUser(userToken, signInForm.isRemembered);
      setIsLoading(false);
      navigate("/");
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }

  // HANDLE ONCHANGE FOR INPUTS
  function handleOnChangeInputs(e) {
    setSignInForm({ ...signInForm, [e.target.id]: e.target.value });
  }
  function handleOnChangeCheckbox(e) {
    setSignInForm({ ...signInForm, isRemembered: e.target.checked });
  }

  return (
    <AuthForm
      form={signInForm}
      isLoading={isLoading}
      handleOnChangeInputs={handleOnChangeInputs}
      handleOnChangeCheckbox={handleOnChangeCheckbox}
      handleSubmit={handleSignInFormSubmit}
      heading="Sign in"
      buttonName="Sign in"
      spanText="New to LinkedIn?"
      linkText="Join now"
      goTo="/signup"
    />
  );
};

export default Login;
