import { Link } from "react-router-dom";
import logo from "../../assets/LI-Logo.png";
import { AuthFormClasses } from "../../imports/styleClasses";
import { CircularProgress } from "@mui/material";
import { useSignUp } from "../../services/queries";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const SignUpSchema = z.object({
  username: z
    .string()
    .min(6, { message: "Username must contain at least 6 character(s)" }),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must contain at least 6 character(s)" }),
});

const SignUp = () => {
  const { isPending, mutateAsync: signUpMutate } = useSignUp();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({ resolver: zodResolver(SignUpSchema), mode: "onChange" });

  const onSubmit = async (data) => {
    try {
      await signUpMutate(data);
    } catch (error) {
      setError("root", { message: error.response.data.error.message });
    }
  };


  
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
          Make the most of your professional life
        </h1>
        <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={`mb-4`}>
              <label htmlFor="userName" className={AuthFormClasses.label}>
                Username
              </label>
              <input
                {...register("username")}
                type="text"
                id="userName"
                className={AuthFormClasses.input}
                placeholder="Enter your username"
              />
              {errors?.username && (
                <div className="text-red-500 tracking-tighter font-semibold text-sm">
                  {errors.username.message}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className={AuthFormClasses.label}>
                Email Address
              </label>
              <input
                {...register("email")}
                type="text"
                id="email"
                className={AuthFormClasses.input}
                placeholder="your@email.com"
              />
              {errors?.email && (
                <div className="text-red-500 tracking-tighter font-semibold text-sm">
                  {errors.email.message}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className={AuthFormClasses.label}>
                Password
              </label>
              <input
                {...register("password")}
                type="password"
                id="password"
                className={AuthFormClasses.input}
                placeholder="Enter your password"
              />

              {errors?.password && (
                <div className="text-red-500 tracking-tighter font-semibold text-sm">
                  {errors.password.message}
                </div>
              )}

              {errors?.root && (
                <div className="text-red-500 mt-2 tracking-tighter font-semibold text-sm">
                  {errors.root.message}
                </div>
              )}
              <p className={AuthFormClasses.p}>
                By clicking Agree & Join, you agree to the LinkedIn User
                Agreement, Privacy Policy, and Cookie Policy.
              </p>
            </div>

            <button
              disabled={isPending}
              type="submit"
              className={AuthFormClasses.button}
            >
              {isPending ? (
                <CircularProgress sx={{ color: "white" }} size={20} />
              ) : (
                ""
              )}

              <span>Agree & Join</span>
            </button>
            <div className="flex justify-center items-center mt-4 gap-1">
              <span>Already on LinkedIn?</span>
              <Link to="/login">
                <span className={AuthFormClasses.span}>Sign in</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
