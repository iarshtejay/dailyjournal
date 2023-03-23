import { Button, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import NewJournalDialog from "./NewJournalDialog";

const WelcomeBar = (props) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      sx={{ marginBottom: "2em" }}
      width="inherit"
    >
      <Paper elevation={0} width="50%">
        <Typography>
          {
            "Welcome to our Journally! We are thrilled to have you here and excited for you to embark on your personal journaling journey with us. Start by creating a new journal or continue a previous one."
          }
        </Typography>
      </Paper>
      <NewJournalDialog createNewJournal={props.createNewJournal} />
    </Box>
  );
};

export default WelcomeBar;
