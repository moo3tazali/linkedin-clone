import Dialog from "@mui/material/Dialog";
import { useEffect, useRef, useState } from "react";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import { MmsIcon } from "../../../import";
import { getUserData } from "../../getUserData";
import axios from "axios";
import { getUserToken } from "../../auth/handleAuth";

export default function NewPostDialog() {
  const [open, setOpen] = useState(false);
  const [post, setPost] = useState({ content: "", media: null });
  const [user, setUser] = useState({
    name: "",
    title: "",
    avatar: "/static/images/avatar/1.jpg",
  });
  const mediaIconRef = useRef();
  const userToken = getUserToken();

  useEffect(() => {
    getUserData().then((data) => {
      const fullName = data.fullName;
      const title = data.title;
      const profilePic = data.profilePic.url;
      setUser({
        ...user,
        name: fullName,
        title: title,
        avatar: profilePic,
      });
    });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handlePostClicked() {
    let data = new FormData();
    data.append("name", "Moataz")
    console.log(data);

    // const response = await axios.post(
    //   "http://localhost:1337/api/createpost",
    //   {
    //     text: post.content,
    //     media: mediaFormData,
    //   },
    //   { headers: { Authorization: "Bearer " + userToken } }
    // );

    // console.log(response);
    // handleClose();
  }

  return (
    <>
      <button
        onClick={handleClickOpen}
        className="w-full border border-gray-400 p-3 flex text-secondary text-sm font-semibold rounded-full duration-300 transition-all hover:bg-background"
      >
        Start a post
      </button>
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="sm">
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
              onClick={handleClose}
              className="font-semibold transition duration-300 hover:bg-gray-200 text-gray-600 text-2xl rounded-full w-11 h-11 flex items-center justify-center"
            >
              X
            </button>
          </div>

          <textarea
            className={`resize-none w-full placeholder:text-gray-700 placeholder:text-[20px] outline-none px-6 py-2 ${
              post.media ? "" : " min-h-[400px]"
            }`}
            placeholder="What do you want to talk about?"
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
          ></textarea>

          <div className={`relative ${post.media ? "" : "hidden"}`}>
            <button
              onClick={() => setPost({ ...post, media: null })}
              className="bg-gray-600 text-gray-100 text-xl rounded-full w-9 h-9 flex items-center justify-center absolute right-4 top-4"
            >
              X
            </button>

            <img
              src={post.media ? URL.createObjectURL(post.media) : ""}
              alt="Post media"
              className="max-w-100 max-h-[500px] object-contain px-6"
            />
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
                onChange={(e) => setPost({ ...post, media: e.target.files[0] })}
                accept="image/*"
                ref={mediaIconRef}
                className="hidden"
              />
            </div>
          </div>
          <div>
            <button
              onClick={handlePostClicked}
              className="font-semibold bg-primary text-white px-4 py-1 rounded-full disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
              disabled={
                post.content.length > 10 || post.media != null ? false : true
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
