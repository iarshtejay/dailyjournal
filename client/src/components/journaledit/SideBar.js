import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Button } from "@mui/material";
import moment from "moment";

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
      <Toolbar sx={{ justifyContent: "space-between", paddingRight: "0" }}>
        <Typography variant="h5">
          {(props.journal?.title || "Arsh's Journal") +
            (props.journal?.icon || "✍🏽")}
        </Typography>
        <IconButton aria-label="add" onClick={() => props.createNewEntry()}>
          <AddBoxIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <Button aria-label="all-journals" variant="text" href="/">
        All Journals
      </Button>
      <Divider />
      <List>
        {props.entries.map((entry, index) => (
          <ListItem
            key={entry.title || index}
            disablePadding
            secondaryAction={
              entry.id === props.currentEntry.id && (
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={(event) => props.deleteEntry(event, entry.id)}
                >
                  <DeleteIcon />
                </IconButton>
              )
            }
            onClick={() => props.setCurrentEntryId(entry.id)}
          >
            <ListItemButton selected={entry.id === props.currentEntry.id}>
              <ListItemText
                primary={entry.body?.split("\n")[0] || "Untitled Entry"}
                secondary={moment(
                  entry?.dateModified || moment.now()
                ).fromNow()}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideBar;
