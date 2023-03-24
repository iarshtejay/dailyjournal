import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Editor from "../components/Editor";
import TitleBar from "../components/journaledit/TitleBar";
import SideBar from "../components/journaledit/SideBar";
import { nanoid } from "nanoid";
import { useParams, useSearchParams } from "react-router-dom";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import PromptGenerator from "../components/journaledit/PromptGenerator";

const drawerWidth = 250;

const JournalEdit = () => {
  const { journalId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeEntry = searchParams.get("activeEntry")
  /* Lazy loading of a state:
   * Pass a function and wrap the expensive code inside a function during state initialization
   * This will ensure that the code gets executed only once even when React re-renders
   * */
  const [journal, setJournal] = React.useState(
    () =>
      JSON.parse(localStorage.getItem("journals"))?.find(
        (journal_) => journal_.id === journalId
      ) || { title: "My Journal" }
  );
  const [entries, setEntries] = React.useState(
    () => JSON.parse(localStorage.getItem(journalId)) || []
  );
  const [currentEntryId, setCurrentEntryId] = React.useState(
    activeEntry || (entries[0] && entries[0].id) || ""
  );

  React.useEffect(() => {
    localStorage.setItem(journalId, JSON.stringify(entries));
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

  return entries && entries.length > 0 ? (
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
        <PromptGenerator />
        <Editor updateEntry={updateEntry} currentEntry={findCurrentEntry()} />
      </Box>
    </Box>
  ) : (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent="center"
      alignItems={"center"}
      height="100vh"
    >
      <Typography variant="h1">{journal?.icon || "✍🏽"}</Typography>
      <Typography variant="h2" sx={{ fontWeight: "bold" }}>
        {journal?.title || "Untitled Journal"}
      </Typography>
      <Typography variant="h5">
        {"You have no entries in this journal. Start by creating a new entry!"}
      </Typography>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Button
          variant="contained"
          onClick={createNewEntry}
          endIcon={<AddBoxIcon />}
          sx={{ margin: "1em" }}
        >
          New Entry
        </Button>
        <Button
          variant="contained"
          href="/"
          endIcon={<ArrowBackIosIcon />}
          sx={{ margin: "1em" }}
        >
          All Journals
        </Button>
      </Box>
    </Box>
  );
};

export default JournalEdit;
