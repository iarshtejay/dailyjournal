import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { ListItemButton } from "@mui/material";
import { IconButton } from "@mui/material";
import { React, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";
import moment from "moment";
import Box from "@mui/material/Box";

const NestedListEntry = (props) => {
  const [open, setOpen] = useState(false);
  const [entries] = useState(
    () => JSON.parse(localStorage.getItem(props.journal?.id)) || []
  );

  return (
    <>
      <ListItemButton href={`/journals/${props.journal?.id || 123}`}>
        <ListItemAvatar>{props.journal?.emoji || "✍🏽"}</ListItemAvatar>
        <ListItemText
          primary={props.journal?.title || "Untitled Journal"}
          secondary={moment(
            props.journal?.dateModified || moment.now()
          ).fromNow()}
        />
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={(event) =>
            props.deleteJournal(event, props.journal?.id || "")
          }
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          edge="end"
          aria-label="expand"
          onClick={(event) => props.toggleJournalEntryList(event, setOpen)}
        >
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </ListItemButton>
      <Divider />
      {open && (
        <Box display={"flex"} flexDirection={"column"}>
          {entries.map((entry) => {
            return (
              <>
                <ListItemButton
                  href={`journals/${props.journal?.id}?activeEntry=${entry.id}`}
                  key={entry.id}
                  dense
                >
                  <ListItemText
                    sx={{ marginLeft: "5em" }}
                    primary={entry.body?.split("\n")[0] || "Untitled Entry"}
                    secondary={moment(
                      entry?.dateModified || moment.now()
                    ).fromNow()}
                  />
                </ListItemButton>
                <Divider sx={{ marginLeft: "5em" }} />
              </>
            );
          })}
        </Box>
      )}
    </>
  );
};

export default NestedListEntry;
