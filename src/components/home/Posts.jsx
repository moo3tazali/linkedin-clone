import { Avatar, IconButton } from "@mui/material";
import PopupMenu from "./PopupMenu";
import CloseIcon from "@mui/icons-material/Close";
import PublicIcon from "@mui/icons-material/Public";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import PostContent from "./PostContent";
import PostFooter from "./PostFooter";
const Posts = () => {
  const postContent = `URGENT HIRING!! High Salary
    Hiring For Multiple Positions For Saudi Arabia
    
    Please hit like or comment so that I can review your profile.
    Just Comment "INTERESTED". I will look at your LinkedIn profile. We will let you know if we have opportunities for you.`;

  return (
    <div className="bg-white rounded-lg shadow-sm max-w-xl mx-auto my-4 border border-gray-200">
      {/* Post Head */}
      <div className="flex justify-between items-start px-4 pt-4">
        <div className="flex items-center gap-3">
          <Avatar
            alt="Moataz Ali"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 48, height: 48 }}
            className="outline outline-white"
          />
          <div>
            <h1 className="text-sm font-semibold">Moataz Ali</h1>
            <h2 className="text-secondary text-xs">FrontEnd Developer</h2>
            <span className="text-xs text-secondary">4d</span>
            <FiberManualRecordIcon
              sx={{ fontSize: "5px", margin: "0 2px" }}
              className="text-secondary"
            />
            <PublicIcon fontSize="10px" className="text-secondary" />
          </div>
        </div>

        <div className="flex items-center">
          <PopupMenu />
          <IconButton
            id="demo-customized-button"
            aria-controls={open ? "demo-customized-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <CloseIcon className="text-secondary" />
          </IconButton>
        </div>
      </div>
      {/*==== Post Head ====*/}

      {/* Post Body */}

      <PostContent content={postContent} />

      {/*=== Post Body ===*/}

      {/* Post Footer */}
      <PostFooter />
      {/*=== Post Footer ===*/}
    </div>
  );
};

export default Posts;
