import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import Index from "../zustand/Index";
import {
  CssBaseline,
  Paper,
  Switch,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useEffect, useState } from "react";

function App() {
  const { darkMode, toggleDarkMode } = Index();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, []);

  // const theme = createTheme({
  //   palette: {
  //     mode:  darkMode ? "light" : "dark",
  //   },

  // });

  const dark = createTheme({
    palette: {
      type: "dark",
      background: {
        paper: "#212121",
      },
      text: {
        primary: "#FFFFFF",
      },
    },
  });
  const light = createTheme({
    palette: {
      type: "light",
      background: {
        paper: "#FFFFFF",
      },
      text: {
        primary: "#00000",
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={darkMode ? dark : light}>
        <Paper sx={{ height: "97vh" }}>
          {window.location.pathname !== "/" &&
            window.location.pathname !== "/signUp" && (
              <Header
                check={darkMode}
                change={() => {
                  toggleDarkMode();
                }}
              />
            )}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Paper>
      </ThemeProvider>
    </>
  );
}

export default App;
