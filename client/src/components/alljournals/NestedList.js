import React from "react";
import List from "@mui/material/List";
import { Paper } from "@mui/material";
import NestedListEntry from "./NestedListEntry";
const NestedList = (props) => {
  const toggleJournalEntryList = (event, setOpen) => {
    event.preventDefault()
    setOpen((prevState) => !prevState);
  };

  return props.journals && props.journals.length > 0 ? (
    <Paper elevation={0}>
      <List sx={{ width: "inherit", bgcolor: "background.paper" }}>
        {props.journals?.map((journal, index) => (
          <NestedListEntry
            key={journal.id || "journal-" + index}
            journal={journal}
            toggleJournalEntryList={toggleJournalEntryList}
            deleteJournal={props.deleteJournal}
          />
        ))}
      </List>
    </Paper>
  ) : (
    <></>
  );
}

export default NestedList