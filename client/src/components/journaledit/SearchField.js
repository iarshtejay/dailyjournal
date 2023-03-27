import React from "react";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";

const SearchField = (props) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const { entries, setSearchResults } = props;

  React.useEffect(() => {
    setSearchResults(() => {
      if (searchTerm === "") return entries;
      else
        return entries.filter((entry) =>
          entry.body.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });
  }, [entries, searchTerm]);


  return (
    <TextField
      id="search-box"
      variant={"standard"}
      label={"Search"}
      onChange={(event) => setSearchTerm(() => event.target.value)}
    />
  );
};

export default SearchField;
