import Textarea from "@mui/joy/Textarea";

const Editor = (props) => {
  return (
    <Textarea
      color="primary"
      placeholder="Type anything…"
      minRows={10}
      onChange={(event) => props.updateEntry(event.target.value)}
      value={props.currentEntry?.body || ""}
      autoFocus={true}
    />
  );
};

export default Editor;
