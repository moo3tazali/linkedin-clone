import { useRef, useState } from "react";

import { CircularProgress, EditIcon } from "../../imports/import";
import { DeleteRequest, PutRequest } from "../../hooks/ApiRequests";
import Modal from "../Modal";

const UpdateCoverPic = ({ currentPic }) => {
  const [coverPic, setCoverPic] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const coverIconRef = useRef();

  // UPDATE COVER PICTURE
  const handleUpdateCoverPic = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("coverPic", coverPic);
    const { response, error } = await PutRequest("/api/user/me", formData);
    console.log(response, error);
    setCoverPic(null);
    setIsLoading(false);
  };

  // DELETE COVER PICTURE
  const handleDeleteCoverPic = async () => {
    const { response, error } = await DeleteRequest("/api/user/me/cover-pic");
    console.log(response, error);
  };

  return (
    <Modal
      btn={<EditIcon fontSize="small" />}
      btnStyle={
        "text-primary absolute top-5 shadow flex justify-center items-center right-5 bg-white w-7 h-7 rounded-full"
      }
      headerText={"Background photo"}
      headerTextStyle={"text-xl text-linkedBlack font-semibold"}
      handleClose={isLoading}
    >
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
            isLoading ? "opacity-20" : ""
          } w-full object-cover max-h-[150px] sm:max-h-[200px]`}
        />
        {isLoading ? (
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
          className="text-secondary transition-all hover:text-linkedBlack hover:bg-background py-1 px-2 rounded"
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
    </Modal>
  );
};

export default UpdateCoverPic;
