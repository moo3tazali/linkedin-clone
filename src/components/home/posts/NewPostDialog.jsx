import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { getUserData } from "../../getUserData";
import { getUserToken } from "../../auth/handleAuth";
import { useRender } from "../../RenderContext";
import {
  MmsIcon,
  Avatar,
  IconButton,
  Tooltip,
  CircularProgress,
  Dialog,
} from "../../../import";

export default function NewPostDialog() {
  const [open, setOpen] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [selectedFile, setSelectedFile] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    name: "",
    title: "",
    avatar: "/static/images/avatar/1.jpg",
  });
  const mediaIconRef = useRef();
  const { callRender } = useRender();

  // GET USER DATA
  const userToken = getUserToken();
  useEffect(() => {
    getUserData().then((data) => {
      const { name, title, avatar } = data;

      setUser({
        ...user,
        name,
        title,
        avatar,
      });
    });
  }, []);

  // HANDLE POSTING NEW POST
  async function handlePostClicked() {
    setIsLoading(true);
    const formData = new FormData();
    selectedFile.map((file) => {
      formData.append("text", postContent);
      formData.append("media", file);
    });

    try {
      await axios.post("http://localhost:1337/api/createpost", formData, {
        headers: {
          Authorization: "Bearer " + userToken,
        },
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
    setIsLoading(false);
    setOpen(false);
    setSelectedFile([]);
    setPostContent("");
    callRender();
  }

  // HANDLE ON CHANGE FOR FILE INPUT
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
      selectedFile.filter((f, i) => {
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
        onClick={() => setOpen(true)}
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
            <div className="flex items-center gap-3">
              <Avatar
                alt={user.name}
                src={user.avatar}
                sx={{ width: 48, height: 48 }}
                className="outline outline-white"
              />
              <div>
                <h1 className="text-sm font-semibold">{user.name}</h1>
                <h2 className="text-secondary text-xs">{user.title}</h2>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="font-semibold transition duration-300 hover:bg-gray-200 text-gray-600 text-2xl rounded-full w-11 h-11 flex items-center justify-center"
            >
              X
            </button>
          </div>

          <textarea
            className={`resize-none w-full placeholder:text-gray-700 placeholder:text-[20px] outline-none px-6 py-2 ${
              selectedFile.length != 0 ? "" : " min-h-[400px]"
            }`}
            placeholder="What do you want to talk about?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
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
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isLoading ? (
              <CircularProgress sx={{ color: "primary" }} size={22} />
            ) : (
              ""
            )}
            <button
              onClick={handlePostClicked}
              className="font-semibold bg-primary text-white px-4 py-1 rounded-full disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
              disabled={
                postContent.length > 10 || selectedFile.length != 0
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
