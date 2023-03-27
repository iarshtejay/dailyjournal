import AllJournals from "./views/AllJournals";
import JournalEdit from "./views/JournalEdit";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AllJournals />,
  },
  {
    path: "/journals/:journalId",
    element: <JournalEdit />,
  },
]);

const themeOptions = {
  palette: {
    type: "light",
    primary: {
      main: "#BB2649",
    },
    secondary: {
      main: "#26BB98",
    },
  },
};

const theme = createTheme(themeOptions);

const App = () => {
  return (
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
  );
};

export default App;
