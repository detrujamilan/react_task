import { Route, Routes, useNavigate } from "react-router-dom";
import Index from "../Store/Index";
import { Paper, ThemeProvider, createTheme } from "@mui/material";
import { useEffect } from "react";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Dashboard from "./components/Home/Dashboard";
import Header from "./components/Header";
import jwt_decode from 'jwt-decode';

function App() {
  const { darkMode, toggleDarkMode } = Index();
  const navigate = useNavigate();
  const token =localStorage.getItem("token");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, []);

  // useEffect(() => {
  //   const decodedToken = jwt_decode(token);
  //   const expirationTimeInSeconds = decodedToken.exp;
  //   const expirationTimeInMilliseconds = expirationTimeInSeconds * 1000;
  //     const currentTime = Date.now();
  //     if (currentTime > expirationTimeInMilliseconds) {
  //       alert('Token has expired');
  //     }
  //   return () => clearTimeout(timer);
  // }, [token]);

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
      <ThemeProvider theme={darkMode ? light : dark}>
        <Paper sx={{ height: "98vh" }}>
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
            <Route path="/dashboard" element={<Dashboard dark={darkMode} />} />
          </Routes>
        </Paper>
      </ThemeProvider>
    </>
  );
}

export default App;
