import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Editor from '../components/Editor';
import TitleBar from '../components/journaledit/TitleBar';
import SideBar from '../components/journaledit/SideBar';

const drawerWidth = 220;

const JournalEdit = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <TitleBar drawerWidth={drawerWidth} />
      <SideBar drawerWidth={drawerWidth} />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Editor />
      </Box>
    </Box>
  );
}

export default JournalEdit