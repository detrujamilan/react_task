import { Route, Routes, useNavigate } from "react-router-dom";
import Index from "../Store/Index";
import { Paper, ThemeProvider, createTheme } from "@mui/material";
import { useEffect } from "react";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Dashboard from "./components/Home/Dashboard";
import Header from "./components/Header";
import jwt_decode from "jwt-decode";
import jwtDecode from "jwt-decode";

function App() {
  const { darkMode, toggleDarkMode } = Index();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // function isTokenExpired() {
  //   const decodedToken = jwtDecode(token);
  //   const currentTime = Date.now() / 1000;
  //   return decodedToken.exp < currentTime;
  // }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, []);

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
        <Paper sx={{ height: "98.3vh" }}>
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
