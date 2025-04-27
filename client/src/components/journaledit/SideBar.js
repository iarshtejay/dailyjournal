import React from "react";
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
import SortEntries from "./SortEntries";
import SearchField from "./SearchField";
import Box from "@mui/material/Box";
import Footer from "../utils/Footer";

const SideBar = (props) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState(props.entries);

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
          {(props.journal?.title || "Untitled Journal") +
            (props.journal?.icon || "✍🏽")}
        </Typography>
        <IconButton aria-label="add" onClick={() => props.createNewEntry()}>
          <AddBoxIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <Button aria-label="all-journals" variant="text" href="/" color="secondary">
        All Journals
      </Button>
      <Divider />
      <Box display={"flex"} flexDirection={"row"} alignItems={"flex-end"}>
        <SortEntries setEntries={setSearchResults} />
        <SearchField
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          entries={props.entries}
          setSearchResults={setSearchResults}
        />
      </Box>

      <Divider />
      <List>
        {searchResults.map((entry, index) => (
          <ListItem
            key={entry.title || index}
            disablePadding
            dense
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
            <ListItemButton
              selected={entry.id === props.currentEntry.id}
              href={`${props.journal?.id}?activeEntry=${entry.id}`}
            >
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
      <Footer />
    </Drawer>
  );
};

export default SideBar;
