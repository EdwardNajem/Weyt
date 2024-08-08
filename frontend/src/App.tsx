import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import Landing from "./Components/Landing/Landing";

import "bootstrap/dist/css/bootstrap.min.css";
const App: React.FC = () => {
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
