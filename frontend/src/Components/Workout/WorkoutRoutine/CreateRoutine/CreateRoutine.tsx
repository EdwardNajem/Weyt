import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Breadcrumb, Col, Row, Button } from "react-bootstrap";
import styles from "./CreateRoutine.module.css";
import ExerciseCard from "../AddExercise/ExerciseCard/ExerciseCard";

type Exercise = {
  name: string;
  primaryMuscle: string;
  type: string;
  image: string;
};

const CreateRoutine: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedExercises =
    (location.state as { selectedExercises?: Exercise[] })?.selectedExercises ||
    [];

  const handleNavigateAddExercise = () => {
    navigate("/home/workout/routine/addexercise", {
      state: { selectedExercises },
    });
  };

  return (
    <Col className={styles.mainColumn}>
      <Breadcrumb className={styles.breadCrumbContainer}>
        <Breadcrumb.Item
          href="http://localhost:3000/home/workout"
          className={styles.breadCrumbItem}
        >
          Workout
        </Breadcrumb.Item>
        <Breadcrumb.Item active className={styles.breadCrumbItem}>
          Create Routine
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className={`logoFont ${styles.title}`}>Create Routine</div>
      <Row className={styles.subTitleRow}>
        <input
          type="text"
          placeholder="Title"
          className={`form-control ${styles.titleInput}`}
        />
        <button
          className={styles.subTitleButton}
          onClick={handleNavigateAddExercise}
        >
          Add Exercise
        </button>
      </Row>
      <div>
        <h4 className={styles.selectedExercisesTitle}>Selected Exercises:</h4>
        <ul>
          {selectedExercises.map((exercise, index) => (
            <ExerciseCard key={index} exercise={exercise} />
          ))}
        </ul>
      </div>
    </Col>
  );
};

export default CreateRoutine;
