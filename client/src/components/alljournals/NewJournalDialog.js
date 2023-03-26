import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EmojiPicker from 'emoji-picker-react';

const NewJournalDialog = (props) => {
  const [open, setOpen] = React.useState(false);
  const [journalTitle, setJournalTitle] = React.useState("")
  const [journalIcon, setJournalIcon] = React.useState({emoji:"✍🏽"})
  const [emojiPickerOpen, setEmojiPickerOpen] = React.useState(true)

  const handleClickOpen = () => {
    setJournalTitle("");
    setJournalIcon({emoji:"✍🏽"})
    setOpen(true);
  };

  const toggleEmojiPickerOpen = () => {
    setEmojiPickerOpen(currState => !currState);
  };

  const handleEmojiSelected = (emoji) => {
    console.log("Emoji--->", emoji)
    setJournalIcon(emoji);
    setEmojiPickerOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddNew = (journalTitle, journalIcon) => {
    props.createNewJournal(journalTitle, journalIcon)
    setOpen(false)
  }

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}  endIcon={<AddBoxIcon />}>
        Create
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create A New Journal</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the journal title and optionally select an emoji to represent the journal.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={journalTitle}
            onChange={(event)=>setJournalTitle(prevEntry => event.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="icon"
            label="Emoji"
            type="text"
            fullWidth
            variant="standard"
            value={journalIcon.emoji}
            onClick={toggleEmojiPickerOpen}
          />
          {emojiPickerOpen && <EmojiPicker onEmojiClick={emoji => handleEmojiSelected(emoji)} lazyLoadEmojis={true} width="100%"/>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleAddNew(journalTitle, journalIcon)}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default NewJournalDialog