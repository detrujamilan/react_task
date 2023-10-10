import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import Index from "../zustand/Index";
import { Box, IconButton, ThemeProvider, createTheme } from "@mui/material";
import { useEffect } from "react";

function App() {
  const token = localStorage.getItem("token");
  const darkMode = Index((state) => state.darkMode);
  const navigate = useNavigate();

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  });
  
  return (
    <>
      <Box
        sx={{
          backgroundColor: darkMode ? "#000000" : "#ffffff",
          height: "100vh",
          color: darkMode ? "" : "#ffffff #000000",
        }}
      >
        <ThemeProvider theme={theme}>
          {window.location.pathname !== "/" &&
            window.location.pathname !== "/signUp" && <Header />}
          <Routes>
            {token ? (
              <Route path="/" element={<Navigate to="/dashboard" />} />
            ) : (
              <Route path="/" element={<Login />} />
            )}
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </ThemeProvider>
      </Box>
    </>
  );
}

export default App;
