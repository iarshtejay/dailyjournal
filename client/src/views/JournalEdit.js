import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Editor from "../components/Editor";
import TitleBar from "../components/journaledit/TitleBar";
import SideBar from "../components/journaledit/SideBar";
import { nanoid } from "nanoid";

const drawerWidth = 250;

const JournalEdit = () => {
  /* Lazy loading of a state:
   * Pass a function and wrap the expensive code inside a function during state initialization
   * This will ensure that the code gets executed only once even when React re-renders
   * */
  const [journal, setJournal] = React.useState({ title: "My Journal" });
  const [entries, setEntries] = React.useState(
    () => JSON.parse(localStorage.getItem("entries")) || []
  );
  const [currentEntryId, setCurrentEntryId] = React.useState(
    (entries[0] && entries[0].id) || ""
  );

  React.useEffect(() => {
    localStorage.setItem("entries", JSON.stringify(entries));
  }, [entries]);

  const createNewEntry = () => {
    const newEntry = {
      id: nanoid(),
      body: "",
      dateAdded: new Date().toISOString(),
      dateModified: new Date().toISOString(),
    };
    setEntries((prevEntries) => [newEntry, ...prevEntries]);
    setCurrentEntryId(newEntry.id);
  };

  const updateEntry = (text) => {
    setEntries((oldEntries) => {
      const newEntries = [];

      oldEntries.map((oldEntry) => {
        if (oldEntry.id === currentEntryId) {
          newEntries.unshift({
            ...oldEntry,
            body: text,
            dateModified: new Date().toISOString(),
          });
        } else {
          newEntries.push(oldEntry);
        }
      });
      return newEntries;
    });
  };

  const findCurrentEntry = () => {
    return (
      entries.find((entry) => {
        return entry.id === currentEntryId;
      }) || entries[0]
    );
  };

  const deleteEntry = (event, entryId) => {
    console.log(event);
    event.stopPropagation();
    setEntries((oldEntries) => {
      const afterDeletion = oldEntries.filter((entry) => entry.id !== entryId);
      if (entryId === currentEntryId) {
        setCurrentEntryId((entryId) => afterDeletion[0] || "");
      }
      return afterDeletion;
    });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <TitleBar drawerWidth={drawerWidth} currentEntry={findCurrentEntry()} />
      <SideBar
        drawerWidth={drawerWidth}
        journal={journal}
        currentEntry={findCurrentEntry()}
        entries={entries}
        deleteEntry={deleteEntry}
        createNewEntry={createNewEntry}
        setCurrentEntryId={setCurrentEntryId}
      />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <Editor updateEntry={updateEntry} currentEntry={findCurrentEntry()} />
      </Box>
    </Box>
  );
};

export default JournalEdit;
