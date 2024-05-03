import { useRef, useState } from "react";
import {
  MmsIcon,
  IconButton,
  Tooltip,
  CircularProgress,
  Dialog,
} from "../../../imports/import";
import ProfileCard from "../../ProfileCard";
import { useCreatePost } from "../../../services/queries";
import { checkInputDirection } from "../../../hooks/checkInputDirection";

export default function NewPostDialog() {
  const [open, setOpen] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [selectedFile, setSelectedFile] = useState([]);
  const [inputDirection, setInputDirection] = useState("ltr");
  const mediaIconRef = useRef();
  const { mutateAsync, isPending } = useCreatePost();

  // HANDLE OPEN NEW POST MODAL
  function openNewPostModal() {
    setOpen(true);
  }
  // HANDLE POSTING NEW POST
  async function handlePostClicked() {
    if (selectedFile.length) {
      const formData = new FormData();
      formData.append("text", postContent);
      selectedFile.map((file) => {
        formData.append("media", file);
      });
      await mutateAsync(formData);
    } else {
      await mutateAsync({ text: postContent });
    }
    setOpen(false);
    setSelectedFile([]);
    setPostContent("");
  }

  // HANDLE ON CHANGE FOR FILE INPUT
  function handleOnChangeText(e) {
    const text = e.target.value;
    setPostContent(text);
    setInputDirection(checkInputDirection(text));
  }
  function handleFilesOnChange(e) {
    const allSelectedFiles = e.target.files;
    let allSelectedFilesArray = [];
    for (let i = 0; i < allSelectedFiles.length; i++) {
      allSelectedFilesArray.push(allSelectedFiles[i]);
    }
    setSelectedFile(allSelectedFilesArray);
  }

  // HANDLE DELETE THE SELECTED IMAGE BEFORE POSTING
  function handleDeleteImage(index) {
    setSelectedFile(
      selectedFile.filter((_, i) => {
        return i !== index;
      })
    );
  }

  // SHOW IMAGES PREVIEW BEFORE POSTING
  const showSelectedFilesContent = selectedFile.map((file, index) => {
    return (
      <div key={index} className="relative w-fit">
        <button
          onClick={() => handleDeleteImage(index)}
          className="bg-gray-600 text-gray-100 text-xl rounded-full w-9 h-9 flex items-center justify-center absolute right-5 top-2"
        >
          X
        </button>
        <img
          src={URL.createObjectURL(file)}
          alt="Post media"
          className="max-w-100 max-h-[500px] object-contain px-6"
        />
      </div>
    );
  });

  return (
    <>
      <button
        onClick={openNewPostModal}
        className="w-full border border-gray-400 p-3 flex text-secondary text-sm font-semibold rounded-full duration-300 transition-all hover:bg-background"
      >
        Start a post
      </button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth={true}
        maxWidth="sm"
      >
        <div>
          <div className="flex justify-between items-center p-4">
            <ProfileCard showName showTitle />
            <button
              onClick={() => setOpen(false)}
              className="font-semibold transition duration-300 hover:bg-gray-200 text-gray-600 text-2xl rounded-full w-11 h-11 flex items-center justify-center"
            >
              X
            </button>
          </div>

          <textarea
            dir={inputDirection}
            className={`resize-none w-full placeholder:text-gray-700 placeholder:text-[20px] outline-none px-6 py-2 ${
              selectedFile.length != 0 ? "" : " min-h-[400px]"
            }`}
            placeholder="What do you want to talk about?"
            value={postContent}
            onChange={handleOnChangeText}
          ></textarea>

          <div
            className={`${
              selectedFile.length > 1 ? "grid grid-cols-2 gap-2" : ""
            }`}
          >
            {showSelectedFilesContent}
          </div>

          <hr className="mt-2" />
        </div>

        <div className="flex justify-between items-center px-4 py-4">
          <div>
            <div
              className="flex items-center gap-3 w-fit cursor-pointer"
              onClick={() => mediaIconRef.current.click()}
            >
              <Tooltip title="Add media" placement="top">
                <IconButton>
                  <MmsIcon className="text-secondary" />
                </IconButton>
              </Tooltip>

              <input
                type="file"
                onChange={handleFilesOnChange}
                accept="image/*"
                ref={mediaIconRef}
                className="hidden"
                multiple
                maxLength={4}
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isPending ? (
              <CircularProgress sx={{ color: "primary" }} size={22} />
            ) : (
              ""
            )}
            {selectedFile.length > 4 && (
              <span className="text-sm font-semibold text-red-700 tracking-tighter">
                You can select only up to 4 files.
              </span>
            )}
            <button
              onClick={handlePostClicked}
              className="font-semibold bg-primary text-white px-4 py-1 rounded-full disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
              disabled={
                postContent.length > 5 ||
                (selectedFile.length != 0 && selectedFile.length <= 4)
                  ? false
                  : true
              }
            >
              Post
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
