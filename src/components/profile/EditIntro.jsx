import { useState } from "react";
import { CircularProgress, Dialog, EditIcon } from "../../imports/import";
import { useForm } from "react-hook-form";
import { useUpdateIntroInfo } from "../../services/queries";

const EditIntro = ({ user }) => {
  const [open, setOpen] = useState(false);
  const { fullName, title } = user;
  const { isPending, mutateAsync: updateIntroMutate } = useUpdateIntroInfo();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: title || "",
      firstName: fullName && fullName.split(" ").shift(),
      lastName:
        fullName &&
        fullName
          .split(" ")
          .filter((_, i) => i !== 0)
          .join(" "),
    },
    mode: "onChange",
  });

  function capitalizeInputs(str) {
    return str
      .split(" ")
      .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
      .join(" ");
  }

  const onSubmit = async ({ firstName, lastName, title }) => {
    const newData = {
      fullName: `${capitalizeInputs(firstName)} ${capitalizeInputs(lastName)}`,
      title: capitalizeInputs(title),
    };
    if (newData.fullName === fullName && newData.title === title)
      return setOpen(false);
    await updateIntroMutate(newData);
    setOpen(false);
  };
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={
          "text-gray-800 mt-5 mr-5 shadow flex justify-center items-center right-5 bg-black/5 w-8 h-8 rounded-full"
        }
      >
        <EditIcon fontSize="medium" />
      </button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth={true}
        maxWidth="md"
      >
        <div className={`flex justify-between items-center px-6 py-3`}>
          <div className="text-xl text-linkedBlack font-semibold">
            Edit Intro
          </div>
          <button
            onClick={() => setOpen(false)}
            className="font-semibold transition duration-300 hover:bg-gray-200 text-gray-600 text-2xl rounded-full w-11 h-11 flex items-center justify-center"
          >
            X
          </button>
        </div>

        <hr />
        <div className="px-6">
          <h1 className="text-2xl font-semibold my-2">Basic info</h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <label
                htmlFor="first-name"
                className="text-sm tracking-tight text-secondary"
              >
                First name
              </label>
              <input
                {...register("firstName", {
                  pattern: {
                    value: /^[^\d]+$/,
                    message: "Please enter only alphabetic characters",
                  },
                })}
                id="first-name"
                type="text"
                className="w-full border border-black rounded-md py-1 px-2 text-black/80 hover:outline hover:outline-1"
              />
              {errors?.firstName && (
                <div className="text-red-500 tracking-tighter font-semibold text-sm">
                  {errors.firstName.message}
                </div>
              )}
            </div>
            <div className="mb-5">
              <label
                htmlFor="last-name"
                className="text-sm tracking-tight text-secondary"
              >
                Last name
              </label>
              <input
                {...register("lastName", {
                  pattern: {
                    value: /^[^\d]+$/,
                    message: "Please enter only alphabetic characters",
                  },
                })}
                id="last-name"
                type="text"
                className="w-full border border-black rounded-md py-1 px-2 text-black/80 hover:outline hover:outline-1"
              />
              {errors?.lastName && (
                <div className="text-red-500 tracking-tighter font-semibold text-sm">
                  {errors.lastName.message}
                </div>
              )}
            </div>
            <div className="mb-5">
              <label
                htmlFor="title"
                className="text-sm tracking-tight text-secondary"
              >
                Title
              </label>
              <input
                {...register("title", {
                  pattern: {
                    value: /^[^\d]+$/,
                    message: "Please enter only alphabetic characters",
                  },
                })}
                id="title"
                type="text"
                className="w-full border border-black rounded-md py-1 px-2 text-black/80 hover:outline hover:outline-1"
              />
              {errors?.title && (
                <div className="text-red-500 tracking-tighter font-semibold text-sm">
                  {errors.title.message}
                </div>
              )}
            </div>

            <hr />
            <div className="flex justify-end items-center gap-3 my-3">
              {isPending ? (
                <CircularProgress sx={{ color: "primary" }} size={22} />
              ) : (
                ""
              )}
              <button
                type="submit"
                className="bg-primary text-white px-4 py-1 rounded-full disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-all hover:bg-blue-900"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </Dialog>
    </>
  );
};

export default EditIntro;
