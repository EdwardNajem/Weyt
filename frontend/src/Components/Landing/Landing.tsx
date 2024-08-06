import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import SidePanel from "../SidePanel/SidePanel";
import Home from "../Home/Home";
import styles from "./Landing.module.css";
import Workout from "../Workout/Workout";

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
