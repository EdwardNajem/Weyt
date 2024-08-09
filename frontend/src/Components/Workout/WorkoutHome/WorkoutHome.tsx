import React, { useCallback, useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import secureLocalStorage from "react-secure-storage";
import instance from "../../../Helper/axiosinstance";

import WorkoutRoutineCard from "./WorkoutRoutineCard/WorkoutRoutineCard";

import styles from "./WorkoutHome.module.css";

const WorkoutHome: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [workoutRoutines, setWorkoutRoutines] = useState<any[]>([]);
  const navigate = useNavigate();

  const fetchWorkoutRoutines = useCallback(async () => {
    setError(null);

    try {
      const token = secureLocalStorage.getItem("token") as string;
      const decodedToken: any = jwtDecode(token);
      const email: string = decodedToken.Name;

      const response = await instance.post(
        "api/Workout/getAllWorkoutRoutines",
        {
          email,
        }
      );

      setWorkoutRoutines(response.data);
    } catch (error: any) {
      console.error(
        "Error fetching workout routines:",
        error.response?.data || error.message
      );
      setError("Failed to fetch workout routines. Please try again.");
    }
  }, []);

  const handleNavigateCreateRoutine = useCallback(() => {
    navigate("/home/workout/routine/addexercise");
  }, [navigate]);

  const handleEdit = useCallback((id: number) => {
    console.log("Edit routine with ID:", id);
  }, []);

  const handleDelete = useCallback(
    async (workoutRoutineId: number) => {
      try {
        const response = await instance.delete(
          `api/Workout/DeleteWorkoutRoutine`,
          {
            data: { workoutRoutineId },
          }
        );
        console.log("Deleted response");

        fetchWorkoutRoutines();
      } catch (error: any) {
        console.error(
          "Error deleting workout routine:",
          error.response?.data || error.message
        );
        setError("Failed to delete workout routine. Please try again.");
      }
    },
    [fetchWorkoutRoutines]
  );

  const handleStart = useCallback((id: number) => {
    console.log("Start routine with ID:", id);
  }, []);

  useEffect(() => {
    fetchWorkoutRoutines();
  }, [fetchWorkoutRoutines]);

  return (
    <Col className={styles.mainColumn}>
      <div className={`logoFont ${styles.title}`}>Workout</div>
      <Row className={styles.subTitleRow}>
        <div className={`logoFont ${styles.subTitletext}`}>Routines</div>
        <button
          className={styles.subTitleButton}
          onClick={handleNavigateCreateRoutine}
        >
          New Routine
        </button>
      </Row>
      <div>
        {error && <div style={{ color: "red" }}>{error}</div>}
        {workoutRoutines.map((routine, index) => (
          <WorkoutRoutineCard
            key={routine.id}
            numberOrder={index + 1}
            title={routine.title}
            onEdit={() => handleEdit(routine.id)}
            onDelete={() => handleDelete(routine.id)}
            onStart={() => handleStart(routine.id)}
          />
        ))}
      </div>
    </Col>
  );
};

export default WorkoutHome;
