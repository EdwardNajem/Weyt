import { Breadcrumb, Col, Row, FormControl } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./AddExercise.module.css";
import React, { useState, useEffect } from "react";
import instance from "../../../../Helper/axiosinstance";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

type Exercise = {
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
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchExercises = () => {
    instance
      .get("/api/Workout/getAllExercises")
      .then((response) => {
        setExercises(response.data);
      })
      .catch((error) => {
        console.error("Error fetching exercises:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleAddRemoveExercise = (exercise: Exercise) => {
    setSelectedExercises((prevSelected) =>
      prevSelected.includes(exercise)
        ? prevSelected.filter((ex) => ex !== exercise)
        : [...prevSelected, exercise]
    );
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleNavigateToCreateRoutine = () => {
    navigate("/home/workout/routine/create", {
      state: { selectedExercises },
    });
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  const filteredExercises = exercises?.filter((exercise) =>
    exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Col className={styles.mainColumn}>
      <Breadcrumb className={styles.breadCrumbContainer}>
        <Breadcrumb.Item
          href="http://localhost:3000/home/workout"
          className={styles.breadCrumbItem}
        >
          Workout
        </Breadcrumb.Item>
        <Breadcrumb.Item
          href="http://localhost:3000/home/workout/routine/create"
          className={styles.breadCrumbItem}
        >
          Create Routine
        </Breadcrumb.Item>
        <Breadcrumb.Item active className={styles.breadCrumbItem}>
          Add Exercise
        </Breadcrumb.Item>
      </Breadcrumb>
      <Row className={styles.subTitleRow}>
        <div className={`logoFont ${styles.subTitletext}`}>Add Exercise</div>
        <button
          className={styles.subTitleButton}
          onClick={handleNavigateToCreateRoutine}
        >
          Add Exercise
        </button>
      </Row>
      <Row className={styles.searchRow}>
        <input
          type="text"
          placeholder="Search for exercises..."
          value={searchQuery}
          onChange={handleSearchChange}
          className={`form-control ${styles.titleInput}`}
        />
      </Row>
      {loading ? null : (
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
