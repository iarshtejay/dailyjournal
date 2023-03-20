import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';

const SideBar = (props) => {
  return (
    <Drawer
      sx={{
        width: props.drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: props.drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar>
        <Typography sx={{fontWeight:"bolder", fontSize:"1 em"}}>{props.journal?.title || "Arsh's Journal"}</Typography>
        <IconButton edge="end" aria-label="add">
                  <AddBoxIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List>
        {["All Journals"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {props.entries ||
          [
            { title: "Entry 1" },
            { title: "Entry 2" },
            { title: "Entry 3" },
          ].map((entry, index) => (
            <ListItem key={entry.title || index} disablePadding secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              }>
              <ListItemButton>
                <ListItemText primary={entry.title || index} secondary={entry.dateModified || (new Date()).toISOString()}/>
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </Drawer>
  );
};

export default SideBar;
