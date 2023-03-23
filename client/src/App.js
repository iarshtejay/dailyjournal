import Editor from "./components/Editor";
import AllJournals from "./views/AllJournals";
import JournalEdit from "./views/JournalEdit";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AllJournals />,
  },
  {
    path: "/journals/*",
    element: <JournalEdit />,
  },
]);

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
