import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";

function App() {
  const token = localStorage.getItem("token");
  return (
    <>
      <Routes>
        {token ? (
          <Route path="/" element={<Navigate to="/dashboard" />} />
        ) : (
          <Route path="/" element={<Login />} />
        )}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
