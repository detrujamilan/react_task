import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import Index from "../zustand/Index";
import {
  Box,
  CssBaseline,
  IconButton,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useEffect } from "react";

function App() {
  const token = localStorage.getItem("token");
  const darkMode = Index((state) => state.darkMode);
  const navigate = useNavigate();

  const darkTheme = createTheme({
    palette: {
      type: "dark",
      background: {
        default: "hsl(200, 17%, 14%)",
      },
    },
  });

  const lightTheme = createTheme({
    palette: {
      primary: {
        main: "#2196F3",
      },
    },
  });

  const selectedTheme = darkMode === "dark" ? darkTheme : lightTheme;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Box
        sx={{
          height: "100vh",
        }}
      >
        <ThemeProvider theme={selectedTheme}>
          <CssBaseline />
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
