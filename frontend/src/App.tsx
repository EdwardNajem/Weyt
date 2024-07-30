import React, { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Login from "./Components/Login/Login";

import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./Components/SignUp/SignUp";
import Home from "./Components/Home/Home";

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
        <Route path="home" element={<Home />} />
      </Routes>
    </Router>
  );
};
export default App;
