import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { IconButton, ListItemIcon, MenuList, Paper } from "@mui/material";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import CodeIcon from "@mui/icons-material/Code";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import FlagIcon from "@mui/icons-material/Flag";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: theme.palette.mode === "light" ? "#191919" : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 26,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function PopupMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreHorizIcon className="text-secondary" />
      </IconButton>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Paper sx={{ width: 350, maxWidth: "100%" }}>
          <MenuList>
            <MenuItem>
              <ListItemIcon>
                <TurnedInNotIcon />
              </ListItemIcon>
              <span className="text-sm font-semibold text-linkedBlack py-3">
                Save
              </span>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <InsertLinkIcon />
              </ListItemIcon>

              <span className="text-sm font-semibold text-linkedBlack py-3">
                Copy link to post
              </span>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <CodeIcon />
              </ListItemIcon>
              <span className="text-sm font-semibold text-linkedBlack py-3">
                I don't want to see this
              </span>
            </MenuItem>

            <MenuItem>
              <ListItemIcon>
                <VisibilityOffIcon />
              </ListItemIcon>
              <span className="text-sm font-semibold text-linkedBlack py-3">
                Unfollow
              </span>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <FlagIcon />
              </ListItemIcon>
              <span className="text-sm font-semibold text-linkedBlack py-3">
                Report post
              </span>
            </MenuItem>
          </MenuList>
        </Paper>
      </StyledMenu>
    </div>
  );
}
