import React from "react";
import List from "@mui/material/List";
import { Paper } from "@mui/material";
import NestedListEntry from "./NestedListEntry";

export default function NestedList(props) {
  const toggleJournalEntryList = (event, setOpen) => {
    setOpen((prevState) => !prevState);
  };

  return props.journals && props.journals.length > 0 ? (
    <Paper elevation={3} width="50%">
      <List sx={{ width: "inherit", bgcolor: "background.paper" }}>
        {props.journals?.map((journal, index) => (
          <NestedListEntry
            key={journal.id || ("journal-"+index)}
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