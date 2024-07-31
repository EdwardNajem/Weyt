import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { GoHome } from "react-icons/go";

import styles from "./SidePanel.module.css";

const SidePanel: React.FC = () => {
  return (
    <Col xs={2} className={styles.mainColumn}>
      <Row className={`logoFont ${styles.logoDisplayRow}`}>Weyt</Row>
      <Row className={styles.itemRow}>
        <div>
          <GoHome />
          <h5>Home</h5>
        </div>
      </Row>
      <Row className={styles.itemRow}>Workout</Row>
      <Row className={styles.itemRow}>Profile</Row>
    </Col>
  );
};

export default SidePanel;
