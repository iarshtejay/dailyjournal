import moment from "moment";
import { Button } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React from "react";

const SortEntries = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
    switch (event.target.textContent) {
      case "A to Z":
        props.setEntries((prevState) => {
          const newState = [...prevState];
          newState.sort((a, b) =>
            a.body.slice(0, 50).localeCompare(b.body.slice(0, 50))
          );
          return newState;
        });
        break;
      case "Z to A":
        props.setEntries((prevState) => {
          const newState = [...prevState];
          newState.sort((a, b) =>
            b.body.slice(0, 50).localeCompare(a.body.slice(0, 50))
          );
          return newState;
        });
        break;
      case "Last Modified":
        props.setEntries((prevState) => {
          const newState = [...prevState];
          newState.sort(
            (a, b) => new moment(a.dateModified) - new moment(b.dateModified)
          );
          return newState;
        });
        props.setEntries((prevState) => prevState.sort());
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={<SortIcon />}
      >
        Sort
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose} value={"A to Z"}>
          {"A to Z"}
        </MenuItem>
        <MenuItem onClick={handleClose} value={"Z to A"}>
          {"Z to A"}
        </MenuItem>
        <MenuItem onClick={handleClose} value={"Last Modified"}>
          {"Last Modified"}
        </MenuItem>
      </Menu>
    </div>
  );
};

export default SortEntries;
