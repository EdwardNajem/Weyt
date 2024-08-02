import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./Workout.module.css";

const Workout: React.FC = () => {
  return (
    <Col className={styles.mainColumn}>
      <div className={`logoFont ${styles.title}`}>Workout</div>
      <Row className={styles.subTitleRow}>
        <div className={`logoFont ${styles.subTitletext}`}>Routines</div>
        <button className={styles.subTitleButton}> New Routine</button>
      </Row>
    </Col>
  );
};

export default Workout;
