import {
  AppBar,
  Box,
  Button,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";

const Header = ({ change, check }) => {
  const UserName = localStorage.getItem("firstName");
  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
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
        <Switch
          color="default"
          defaultChecked
          onClick={change}
          checked={check}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
