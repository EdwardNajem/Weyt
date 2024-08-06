import React, { useCallback } from "react";
import { Row, Col } from "react-bootstrap";
import styles from "./WorkoutHome.module.css";
import { useNavigate } from "react-router-dom";

const WorkoutHome: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateCreateRountine = useCallback(() => {
    navigate("/home/workout/routine/create");
  }, []);

  return (
    <Col className={styles.mainColumn}>
      <div className={`logoFont ${styles.title}`}>Workout</div>
      <Row className={styles.subTitleRow}>
        <div className={`logoFont ${styles.subTitletext}`}>Routines</div>
        <button
          className={styles.subTitleButton}
          onClick={handleNavigateCreateRountine}
        >
          New Routine
        </button>
      </Row>
    </Col>
  );
};

export default WorkoutHome;
