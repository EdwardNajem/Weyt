import { Breadcrumb, Col, Row, ListGroup } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";

import Loading from "../../../Loading/Loading";
import instance from "../../../../Helper/axiosinstance";

import styles from "./AddExercise.module.css";

type Exercise = {
  id: number;
  name: string;
  primaryMuscle: string;
  type: string;
  image: string;
};

const AddExercise: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialSelectedExercises =
    (location.state as { selectedExercises?: Exercise[] })?.selectedExercises ||
    [];
  const [exercises, setExercises] = useState<Exercise[] | null>(null);
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>(
    initialSelectedExercises
  );
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchExercises = useCallback(() => {
    instance
      .get("/api/Workout/getAllExercises")
      .then((response) => {
        setExercises(response.data);
      })
      .catch(() => {
        setError("Failed to Load Exercises");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleAddRemoveExercise = useCallback(
    (exercise: Exercise) => {
      setSelectedExercises((prevSelected) =>
        prevSelected.includes(exercise)
          ? prevSelected.filter((ex) => ex !== exercise)
          : [...prevSelected, exercise]
      );
    },
    [setSelectedExercises]
  );

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
    },
    []
  );

  const handleClearSearch = useCallback(() => {
    setSearchQuery("");
  }, []);

  const handleNavigateToCreateRoutine = useCallback(() => {
    if (selectedExercises.length > 0) {
      navigate("/home/workout/routine/create", {
        state: { selectedExercises },
      });
    }
  }, [selectedExercises, navigate]);

  const handleNavigateToWorkout = useCallback(() => {
    navigate("/home/workout");
  }, [navigate]);

  useEffect(() => {
    fetchExercises();
  }, [fetchExercises]);

  const filteredExercises = exercises?.filter((exercise) =>
    exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Col className={styles.mainColumn}>
      <Breadcrumb className={styles.breadCrumbContainer}>
        <Breadcrumb.Item
          className={styles.breadCrumbItem}
          onClick={handleNavigateToWorkout}
        >
          Workout
        </Breadcrumb.Item>
        <Breadcrumb.Item active className={styles.breadCrumbItem}>
          Add Exercises
        </Breadcrumb.Item>
      </Breadcrumb>
      <Row className={styles.subTitleRow}>
        <div className={`logoFont ${styles.subTitletext}`}>Add Exercises</div>
        <button
          className={styles.subTitleButton}
          onClick={handleNavigateToCreateRoutine}
          disabled={selectedExercises.length === 0}
        >
          Next
        </button>
      </Row>
      <Row className={styles.searchRow}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search for exercises..."
            value={searchQuery}
            onChange={handleSearchChange}
            className={`form-control ${styles.titleInput}`}
          />
          <button
            onClick={handleClearSearch}
            className={`form-control ${styles.clearButton}`}
          >
            Clear
          </button>
        </div>
      </Row>
      {error && <div className={styles.errorMessage}>{error}</div>}
      {loading ? (
        <div className={styles.loadingContainer}>
          <Loading />
        </div>
      ) : (
        <ListGroup as="ol" variant="dark" className={`${styles.exerciseList}`}>
          {filteredExercises?.map((exercise, index) => (
            <ListGroup.Item
              as="li"
              key={index}
              variant="dark"
              className={`bg-dark ${styles.exerciseItem}`}
            >
              <div className={styles.exerciseDetails}>
                <img
                  src={exercise.image}
                  alt={exercise.name}
                  className={styles.exerciseImage}
                />
                <div>
                  <div className={styles.exerciseName}>{exercise.name}</div>
                  <div className={styles.exerciseMuscle}>
                    {exercise.primaryMuscle}
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleAddRemoveExercise(exercise)}
                className={styles.subTitleButton}
              >
                {selectedExercises.includes(exercise) ? "Remove" : "Add"}
              </button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Col>
  );
};

export default AddExercise;
