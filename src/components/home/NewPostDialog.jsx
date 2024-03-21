import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useState } from "react";
import { Avatar } from "@mui/material";

export default function NewPostDialog() {
  const [open, setOpen] = useState(false);
  const [post, setPost] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handlePostClicked() {

   
    handleClose()
  }
  return (
    <>
      <button
        onClick={handleClickOpen}
        className="w-full border border-gray-400 p-3 flex text-secondary text-sm font-semibold rounded-full duration-300 transition-all hover:bg-background"
      >
        Start a post
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <div>
            <div className="flex items-center gap-3 mb-5">
              <Avatar
                alt="Moataz Ali"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 48, height: 48 }}
                className="outline outline-white"
              />
              <div>
                <h1 className="text-sm font-semibold">Moataz Ali</h1>
                <h2 className="text-secondary text-xs">FrontEnd Developer</h2>
              </div>
            </div>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              value={post}
              onChange={(e) => setPost(e.target.value)}
            ></textarea>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handlePostClicked}>Post</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
