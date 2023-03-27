import { TextField } from "@mui/material";

const Editor = (props) => {
  return (
    <TextField
      id="journal-content"
      color="primary"
      placeholder="Let it flow"
      minRows={10}
      onChange={(event) => props.updateEntry(event.target.value)}
      value={props.currentEntry?.body || ""}
      autoFocus={true}
      multiline
      fullWidth
    />
  );
};

export default Editor;
