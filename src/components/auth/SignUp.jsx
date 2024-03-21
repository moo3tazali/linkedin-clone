import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { storeUser } from "./handleAuth";
import AuthForm from "./AuthForm";

const SignUp = () => {
  const [signUpForm, setSignUpForm] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSignUpFormSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:1337/api/auth/local/register",
        {
          username: signUpForm.userName,
          email: signUpForm.email,
          password: signUpForm.password,
        }
      );

      const userToken = response.data.jwt;
      storeUser(userToken, false);
      navigate("/");
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }
  // HANDLE ONCHANGE FOR INPUTS
  function handleOnChangeInputs(e) {
    setSignUpForm({ ...signUpForm, [e.target.id]: e.target.value });
  }
  function handleOnChangeCheckbox(e) {
    setSignUpForm({ ...signUpForm, isRemembered: e.target.checked });
  }

  return (
    <AuthForm
      form={signUpForm}
      isLoading={isLoading}
      handleOnChangeInputs={handleOnChangeInputs}
      handleOnChangeCheckbox={handleOnChangeCheckbox}
      handleSubmit={handleSignUpFormSubmit}
      heading="Make the most of your professional life"
      buttonName="Agree & Join"
      spanText="Already on LinkedIn?"
      linkText="Sign in"
      goTo="/login"
      toShow={true}
    />
  );
};

export default SignUp;
