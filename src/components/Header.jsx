import {
  AppBar,
  Box,
  Button,
  IconButton,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { SwitchAccessShortcut, ToggleOn } from "@mui/icons-material";
import Index from "../../zustand/Index";

const Header = () => {
  const toggleDarkMode = Index((state) => state.toggleDarkMode);
  const UserName = localStorage.getItem("firstName");

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {UserName}
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              window.location.href = "/";
              localStorage.removeItem("token");
            }}
          >
            Log Out
          </Button>
          <Switch color="default"  defaultChecked onClick={toggleDarkMode} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
