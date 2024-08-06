import React, { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";

import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import Landing from "./Components/Landing/Landing";

import "bootstrap/dist/css/bootstrap.min.css";
const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = secureLocalStorage.getItem("token");
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home/*" element={<Landing />} />
      </Routes>
    </Router>
  );
};
export default App;
