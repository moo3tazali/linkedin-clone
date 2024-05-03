import { Link } from "react-router-dom";
import logo from "../../assets/LI-Logo.png";
import { AuthFormClasses } from "../../imports/styleClasses";
import { CircularProgress } from "@mui/material";
import { useLogin } from "../../services/queries";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginSchema = z.object({
  identifier: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must contain at least 6 character(s)" }),
  isRemember: z.boolean(),
});

const Login = () => {
  const { isPending, mutateAsync: loginMutate } = useLogin();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: zodResolver(LoginSchema), mode: "onChange" });

  //
  //
  // HANDLE API LOGIN
  async function onSubmit(data) {
    try {
      await loginMutate(data);
    } catch (error) {
      setError("root", { message: error.response.data.error.message });
    }
  }
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
          Sign in
        </h1>
        <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="email" className={AuthFormClasses.label}>
                Email Address
              </label>
              <input
                {...register("identifier")}
                type="text"
                id="email"
                className={AuthFormClasses.input}
                placeholder="your@email.com"
              />
              {errors?.identifier && (
                <div className="text-red-500 tracking-tighter font-semibold text-sm">
                  {errors.identifier.message}
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
              <div className={`flex items-center mt-1`}>
                <input
                  {...register("isRemember")}
                  type="checkbox"
                  id="isRemember"
                  className={AuthFormClasses.checkbox}
                />
                <label
                  htmlFor="isRemember"
                  className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>
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

              <span>Sign in</span>
            </button>
            <div className="flex justify-center items-center mt-4 gap-1">
              <span>New to LinkedIn?</span>
              <Link to="/signup">
                <span className={AuthFormClasses.span}>Join now</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
