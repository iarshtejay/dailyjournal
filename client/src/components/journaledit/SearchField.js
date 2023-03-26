import React from "react";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";

const SearchField = (props) => {
  const [showSearchField, setShowSearchField] = React.useState(false);
  const toggleShowSearchField = () => {
    setShowSearchField((prevState) => !prevState);
  };

  const handleSearchInput = (event) => {
    props.setSearchResults(() => {
      if (event.target.value === "") return props.entries;
      else
        return props.entries.filter((entry) =>
          entry.body.toLowerCase().includes(event.target.value.toLowerCase())
        );
    });
  };

  return (
    <Box>
      <Button
        id="basic-button"
        onClick={toggleShowSearchField}
        endIcon={<SearchIcon />}
      >
        Search
      </Button>
      {showSearchField && (
        <TextField
          id="search-box"
          variant={"standard"}
          onChange={(event) => handleSearchInput(event)}
        />
      )}
    </Box>
  );
};

export default SearchField;
