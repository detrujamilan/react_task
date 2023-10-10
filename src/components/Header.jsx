import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";

const Header = ({userName}) => {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            {userName}
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
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
