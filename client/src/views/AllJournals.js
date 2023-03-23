import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import TitleBar from "../components/alljournals/TitleBar";
import { nanoid } from "nanoid";
import NestedList from "../components/alljournals/NestedList";
import WelcomeBar from "../components/alljournals/WelcomeBar";
import AnimatedWelcomeMessage from "../components/alljournals/AnimatedWelcomeMessage";
import NewJournalDialog from "../components/alljournals/NewJournalDialog";
import { Typography } from "@mui/material";
import background from "../bg.jpg";
import { maxWidth } from "@mui/system";

const AllJournals = (props) => {
  /* Lazy loading of a state:
   * Pass a function and wrap the expensive code inside a function during state initialization
   * This will ensure that the code gets executed only once even when React re-renders
   * */
  const [user, setUser] = React.useState("John Doe!");
  const [journals, setJournals] = React.useState(
    () => JSON.parse(localStorage.getItem("journals")) || []
  );
  const [currentJournalId, setCurrentJournalId] = React.useState(
    (journals[0] && journals[0].id) || ""
  );

  React.useEffect(() => {
    localStorage.setItem("journals", JSON.stringify(journals));
  }, [journals]);

  const createNewJournal = (journalTitle, journalIcon) => {
    const newJournal = {
      id: nanoid(),
      title: journalTitle || "",
      icon: journalIcon?.emoji || "✍🏽",
      dateModified: new Date().toISOString(),
      dateCreated: new Date().toISOString(),
    };
    setJournals((prevJournals) => [newJournal, ...prevJournals]);
    setCurrentJournalId(newJournal.id);
  };

  const updateJournal = (text) => {
    setJournals((oldJournals) => {
      const newJournals = [];

      oldJournals.map((oldJournal) => {
        if (oldJournal.id === currentJournalId) {
          newJournals.unshift({
            ...oldJournal,
            body: text,
            dateModified: new Date().toISOString(),
          });
        } else {
          newJournals.push(oldJournal);
        }
      });
      return newJournals;
    });
  };

  const findCurrentJournal = () => {
    return (
      journals.find((journal) => {
        return journal.id === currentJournalId;
      }) || journals[0]
    );
  };

  const deleteJournal = (event, journalId) => {
    console.log(event);
    event.stopPropagation();
    setJournals((oldJournals) => {
      const afterDeletion = oldJournals.filter(
        (journal) => journal.id !== journalId
      );
      if (journalId === currentJournalId) {
        setCurrentJournalId((journalId) => afterDeletion[0] || "");
      }
      return afterDeletion;
    });
  };

  return journals && journals.length > 0 ? (
    <Box>
      <TitleBar />
      <Box flexDirection={"column"} sx={{ display: "flex", marginTop: "4em" }}>
        <CssBaseline />
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <WelcomeBar createNewJournal={createNewJournal} />
          <NestedList journals={journals} deleteJournal={deleteJournal} />
        </Box>
      </Box>
    </Box>
  ) : (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent="center"
      alignItems={"center"}
      sx={{ backgroundImage: `url(${background})`, objectFit: "contain" }}
      height="100vh"
    >
      <Typography variant="h1">📝</Typography>
      <Typography variant="h1" sx={{ fontWeight: "bold" }}>
        Journally
      </Typography>
      <AnimatedWelcomeMessage />
      <NewJournalDialog createNewJournal={createNewJournal} />
    </Box>
  );
};

export default AllJournals;
