import React, { useCallback, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Breadcrumb, Col, Row } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import secureLocalStorage from "react-secure-storage";

import instance from "../../../../Helper/axiosinstance";
import ExerciseCard from "../AddExercise/ExerciseCard/ExerciseCard";

import styles from "./CreateRoutine.module.css";

type Exercise = {
  id: number;
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

type WorkoutRoutineData = {
  title: string;
  userEmail: string;
  workout: {
    exerciseId: number;
    exerciseSet: {
      reps?: number;
      weight?: number;
      duration?: string;
      number: number;
    }[];
  }[];
};

const CreateRoutine: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const inputTitleRef = useRef<HTMLInputElement>(null);
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
  }, [navigate]);

  const handleNavigateAddExercise = useCallback(() => {
    navigate("/home/workout/routine/addexercise");
  }, [navigate]);

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

  const handleCreateWorkoutRoutine = useCallback(async () => {
    setLoading(true);
    setError(null);

    const title = inputTitleRef.current?.value.trim() || "";

    if (!title) {
      setError("Title cannot be empty.");
      setLoading(false);
      return;
    }

    if (selectedExercises.some((exercise) => exercise.sets.length === 0)) {
      setError("Each exercise must have at least one set.");
      setLoading(false);
      return;
    }

    const token = secureLocalStorage.getItem("token") as string;
    const decodedToken: any = jwtDecode(token);
    const userEmail: string = decodedToken.Name;

    const workoutData: WorkoutRoutineData = {
      title,
      userEmail,
      workout: selectedExercises.map((exercise) => ({
        exerciseId: exercise.id,
        exerciseSet: exercise.sets.map((set, index) => ({
          reps: set.reps,
          weight: set.weight,
          duration: set.time,
          number: index + 1,
        })),
      })),
    };
    console.log("Posting workout data:", workoutData);

    try {
      const response = await instance.post(
        "api/Workout/CreateWorkoutRoutine",
        workoutData
      );
      console.log("Response:", response.data);
      navigate("/home/workout");
    } catch (error: any) {
      console.error(
        "Error creating workout routine:",
        error.response?.data || error.message
      );
      setError("Failed to create workout routine. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [selectedExercises]);

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
          ref={inputTitleRef}
          disabled={loading === true}
        />
        <button
          className={styles.subTitleButton}
          onClick={handleCreateWorkoutRoutine}
          disabled={loading === true}
        >
          Create
        </button>
      </Row>
      {error && <div className={styles.errorMessage}>{error}</div>}
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
