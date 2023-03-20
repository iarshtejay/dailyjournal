import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const TitleBar = (props) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${props.drawerWidth}px)`,
        ml: `${props.drawerWidth}px`,
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          {props.currentEntry?.body?.split("\n")[0] || "Untitled Entry"}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TitleBar;
