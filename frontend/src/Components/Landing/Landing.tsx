import React from "react";
import { Container, Row } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";

import SidePanel from "../SidePanel/SidePanel";
import Home from "../Home/Home";
import Workout from "../Workout/Workout";

import styles from "./Landing.module.css";

const Landing: React.FC = () => {
  return (
    <Container fluid className={styles.mainContainer}>
      <Row className={styles.mainRow}>
        <SidePanel />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workout/*" element={<Workout />} />
        </Routes>
      </Row>
    </Container>
  );
};

export default Landing;
