import { IconButton, Typography } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import useWindowDimensions from "../hooks/WindowDimensions";

const Footer = () => {
  const { height, width } = useWindowDimensions();
  return (
    <Typography
      color={"gray"}
      fontSize={"0.80em"}
      sx={{
        position: "fixed",
        bottom: "1em",
        left: "40%",
        right: "40%",
        alignItems: "center",
      }}
      display={height > 500 && width > 600 ? "block" : "none"}
    >
      Made with ❤ and ☕{" "}
      <IconButton
        size="small"
        href="https://www.linkedin.com/in/arshdeep-singh09/"
      >
        <LinkedInIcon />
      </IconButton>{" "}
      <IconButton
        size="small"
        href="https://github.com/iarshtejay/dailyjournal"
      >
        <GitHubIcon />
      </IconButton>
    </Typography>
  );
};

export default Footer;
