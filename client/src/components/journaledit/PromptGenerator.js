import { Button, Snackbar, Typography } from "@mui/material";
import { Configuration, OpenAIApi } from "openai";
import { Box } from "@mui/system";
import React from "react";
import { Alert } from "@mui/material";
import prompts from "../../data/prompts.json";

const PromptGenerator = () => {
  const [prompt, setPrompt] = React.useState("What's on your mind?");
  const [showPromptTip, setShowPromptTip] = React.useState(true);
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowPromptTip(false);
    }, 30000);
    return () => clearTimeout(timer);
  }, []);

  const pickARandomPrompt = () => {
    setPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
  };

  return (
    <Box>
      {showPromptTip && (
        <Alert
          severity="info"
          sx={{ marginBottom: "1em" }}
          onClose={() => {
            setShowPromptTip(false);
          }}
        >
          {
            "Need inspiration? Click on generate a prompt to generate a writing prompt"
          }
        </Alert>
      )}
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        sx={{ marginBottom: "1em" }}
      >
        <Typography sx={{ fontStyle: "italic" }} alignSelf={"center"}>
          {prompt}
        </Typography>
        <Button onClick={pickARandomPrompt} variant={"contained"}>
          Generate A Writing Prompt
        </Button>
      </Box>
    </Box>
  );
};

export default PromptGenerator;
