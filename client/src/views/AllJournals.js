import React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import TitleBar from "../components/alljournals/TitleBar";
import { nanoid } from "nanoid";
import NestedList from "../components/alljournals/NestedList";
import WelcomeBar from "../components/alljournals/WelcomeBar";
import AnimatedWelcomeMessage from "../components/alljournals/AnimatedWelcomeMessage";
import NewJournalDialog from "../components/alljournals/NewJournalDialog";
import { Skeleton, Typography } from "@mui/material";
import background from "../bg.jpg";
import Footer from "../components/utils/Footer";
import journalsApi from "../services/journals-rest";
import { Alert } from "@mui/material";

const AllJournals = () => {
  /* Lazy loading of a state:
   * Pass a function and wrap the expensive code inside a function during state initialization
   * This will ensure that the code gets executed only once even when React re-renders
   * */

  const [journals, setJournals] = React.useState([]);
  const [currentJournalId, setCurrentJournalId] = React.useState(
    (journals[0] && journals[0].id) || ""
  );
  const [journalsLoading, setJournalsLoading] = React.useState(true);
  const [successAlert, setSuccessAlert] = React.useState(null);
  const [failAlert, setFailAlert] = React.useState(null);
  const generateAlert = (severity) => {
    return <Alert severity={severity}>{successAlert || failAlert}</Alert>;
  };

  React.useEffect(() => {
    localStorage.setItem("journals", JSON.stringify(journals));

    journalsApi
      .getAllJournals()
      .then((res) => {
        if (res?.data?.success) {
          setJournals(res.data.journals);
          console.log(res);
        } else {
          //Set notification
          console.log("cannot get journals --> ", res.data.message);
        }
        setJournalsLoading(false);
      })
      .catch((err) => {
        setJournalsLoading(false);
        console.log(err);
      });
  }, []);

  const createNewJournal = (journalTitle, journalIcon) => {
    const newJournal = {
      id: nanoid(),
      title: journalTitle || "",
      emoji: journalIcon?.emoji || "✍🏽",
      dateModified: new Date().toISOString(),
      dateCreated: new Date().toISOString(),
    };
    setJournals((prevJournals) => [newJournal, ...prevJournals]);
    setCurrentJournalId(newJournal.id);

    journalsApi
      .createJournal(newJournal)
      .then((res) => {
        //Send notification
        setSuccessAlert("Journal created")
        setFailAlert(null)
        console.log(res);
      })
      .catch((err) => {
        //Send notification
        setSuccessAlert(null)
        setFailAlert("Cannot create journal: "+ err.toString())
        console.log(err);
      });
  };

  const deleteJournal = (event, journalId) => {
    event.stopPropagation();
    event.preventDefault();
    setJournals((oldJournals) => {
      const afterDeletion = oldJournals.filter(
        (journal) => journal.id !== journalId
      );
      if (journalId === currentJournalId) {
        setCurrentJournalId((journalId) => afterDeletion[0] || "");
      }
      localStorage.removeItem(journalId);
      return afterDeletion;
    });

    journalsApi
      .deleteJournal(journalId)
      .then((res) => {
        //Send notification
        setSuccessAlert("Journal deleted")
        setFailAlert(null)
        console.log(res);
      })
      .catch((err) => {
        //Send notification
        setSuccessAlert(null)
        setFailAlert("Cannot delete journal: "+ err.toString())
        console.log(err);
      });
  };

  if (journals && journals.length === 0 && !journalsLoading) {
    return (
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
          Journo
        </Typography>
        <AnimatedWelcomeMessage />
        <NewJournalDialog createNewJournal={createNewJournal} />
      </Box>
    );
  }

  return (
    <Box>
      <TitleBar />
      <Box flexDirection={"column"} sx={{ display: "flex", marginTop: "4em" }}>
        <CssBaseline />
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <WelcomeBar createNewJournal={createNewJournal} />
          {journalsLoading ? (
            <>
              <Skeleton
                variant="rectangular"
                maxWidth
                height={80}
                sx={{ marginBottom: "1em" }}
              />
              <Skeleton
                variant="rectangular"
                maxWidth
                height={80}
                sx={{ marginBottom: "1em" }}
              />
              <Skeleton
                variant="rectangular"
                maxWidth
                height={80}
                sx={{ marginBottom: "1em" }}
              />
            </>
          ) : (
            <>
              {successAlert !== null ? generateAlert("success") : null}
              {failAlert !== null ? generateAlert("error") : null}
              <NestedList journals={journals} deleteJournal={deleteJournal} />
            </>
          )}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default AllJournals;
