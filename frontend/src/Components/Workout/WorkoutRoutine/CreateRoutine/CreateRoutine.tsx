import React, { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Breadcrumb, Col, Row } from "react-bootstrap";
import styles from "./CreateRoutine.module.css";
import ExerciseCard from "../AddExercise/ExerciseCard/ExerciseCard";

type Exercise = {
  name: string;
  primaryMuscle: string;
  type: string;
  image: string;
};

type Set = {
  reps?: number;
  weight?: number;
  time?: string;
};

type ExerciseWithSets = Exercise & {
  sets: Set[];
};

const CreateRoutine: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedExercises, setSelectedExercises] = useState<
    ExerciseWithSets[]
  >(
    (
      (location.state as { selectedExercises?: Exercise[] })
        ?.selectedExercises || []
    ).map((exercise) => ({
      ...exercise,
      sets: [],
    }))
  );

  const handleNavigateToWorkout = useCallback(() => {
    navigate("/home/workout");
  }, []);

  const handleNavigateAddExercise = () => {
    navigate("/home/workout/routine/addexercise");
  };

  const handleRemoveExercise = (index: number) => {
    setSelectedExercises((prevExercises) =>
      prevExercises.filter((_, i) => i !== index)
    );
  };

  const handleAddSet = (exerciseIndex: number) => {
    setSelectedExercises((prevExercises) =>
      prevExercises.map((exercise, index) =>
        index === exerciseIndex
          ? {
              ...exercise,
              sets: [...exercise.sets, { reps: 0, weight: 0, time: "00:00" }],
            }
          : exercise
      )
    );
  };

  const handleRemoveSet = (exerciseIndex: number, setIndex: number) => {
    setSelectedExercises((prevExercises) =>
      prevExercises.map((exercise, index) =>
        index === exerciseIndex
          ? {
              ...exercise,
              sets: exercise.sets.filter((_, i) => i !== setIndex),
            }
          : exercise
      )
    );
  };

  const handleSetChange = (
    exerciseIndex: number,
    setIndex: number,
    field: string,
    value: string | number
  ) => {
    setSelectedExercises((prevExercises) =>
      prevExercises.map((exercise, eIndex) =>
        eIndex === exerciseIndex
          ? {
              ...exercise,
              sets: exercise.sets.map((set, sIndex) =>
                sIndex === setIndex ? { ...set, [field]: value } : set
              ),
            }
          : exercise
      )
    );
  };

  return (
    <Col className={styles.mainColumn}>
      <Breadcrumb className={styles.breadCrumbContainer}>
        <Breadcrumb.Item
          onClick={handleNavigateToWorkout}
          className={styles.breadCrumbItem}
        >
          Workout
        </Breadcrumb.Item>
        <Breadcrumb.Item
          onClick={handleNavigateAddExercise}
          className={styles.breadCrumbItem}
        >
          Add Exercises
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
        <button className={styles.subTitleButton}>Create</button>
      </Row>
      <div>
        <h4 className={styles.selectedExercisesTitle}>Selected Exercises:</h4>
        <div className={styles.selectedExercisesList}>
          {selectedExercises.map((exercise, eIndex) => (
            <ExerciseCard
              key={eIndex}
              exercise={exercise}
              sets={exercise.sets}
              onRemove={() => handleRemoveExercise(eIndex)}
              onAddSet={() => handleAddSet(eIndex)}
              onRemoveSet={(sIndex) => handleRemoveSet(eIndex, sIndex)}
              onSetChange={(sIndex, field, value) =>
                handleSetChange(eIndex, sIndex, field, value)
              }
            />
          ))}
        </div>
      </div>
    </Col>
  );
};

export default CreateRoutine;
