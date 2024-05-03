import { useRef, useState } from "react";

import { CircularProgress, Dialog, EditIcon } from "../../imports/import";

import { useDeleteCover, useUpdateCover } from "../../services/queries";
import { handleUserDataApi } from "../../store/features/userDataSlice";
import { useDispatch } from "react-redux";

const UpdateCoverPic = ({ currentPic }) => {
  const [coverPic, setCoverPic] = useState(null);
  const [open, setOpen] = useState(false);

  const coverIconRef = useRef();
  const { isPending, mutateAsync: updateMutate } = useUpdateCover();
  const { mutateAsync: deleteMutate } = useDeleteCover();
  const dispatch = useDispatch();

  const defaultCoverPic =
    "https://res.cloudinary.com/dlpkoketm/image/upload/v1711390852/Screenshot_2024_03_25_201913_1babd8460d.png";

  // UPDATE COVER PICTURE
  const handleUpdateCoverPic = async () => {
    const formData = new FormData();
    formData.append("coverPic", coverPic);
    await updateMutate(formData);
    setCoverPic(null);
    dispatch(handleUserDataApi());
    setOpen(false);
  };

  // DELETE COVER PICTURE
  const handleDeleteCoverPic = async () => {
    await deleteMutate();
    setCoverPic(null);
    dispatch(handleUserDataApi());
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={
          "text-primary absolute top-5 shadow flex justify-center items-center right-5 bg-white w-7 h-7 rounded-full"
        }
      >
        <EditIcon fontSize="small" />
      </button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth={true}
        maxWidth="md"
      >
        <div className={`flex justify-between items-center p-4`}>
          <div className="text-xl text-linkedBlack font-semibold">
            Background photo
          </div>
          <button
            onClick={() => setOpen(false)}
            className="font-semibold transition duration-300 hover:bg-gray-200 text-gray-600 text-2xl rounded-full w-11 h-11 flex items-center justify-center"
          >
            X
          </button>
        </div>

        <hr />
        <div className="w-full bg-black min-h-[400px] my-5 flex items-center justify-center relative">
          <input
            type="file"
            className="hidden"
            accept="image/*"
            ref={coverIconRef}
            onChange={(e) => setCoverPic(e.target.files[0])}
          />
          <img
            src={coverPic ? URL.createObjectURL(coverPic) : currentPic}
            alt="cover"
            className={`${
              isPending ? "opacity-20" : ""
            } w-full object-cover max-h-[150px] sm:max-h-[200px]`}
          />
          {isPending ? (
            <CircularProgress
              sx={{ color: "primary", position: "absolute" }}
              size={50}
            />
          ) : (
            ""
          )}
        </div>
        <hr />

        <div className="flex items-center justify-between p-3 font-semibold">
          <button
            onClick={handleDeleteCoverPic}
            className="text-secondary transition-all hover:text-linkedBlack hover:bg-background py-1 px-2 rounded disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-secondary"
            disabled={currentPic === defaultCoverPic && true}
          >
            Delete photo
          </button>
          <div className="flex gap-3 items-center">
            <button
              onClick={() => coverIconRef.current.click()}
              className="text-primary border-2 border-primary/30 rounded-full px-4 py-1 transition-all hover:border-blue-900 hover:text-blue-900 hover:border-2"
            >
              Change photo
            </button>
            <button
              onClick={handleUpdateCoverPic}
              className="bg-primary text-white px-4 py-1 rounded-full disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-all hover:bg-blue-900"
            >
              Apply
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default UpdateCoverPic;
