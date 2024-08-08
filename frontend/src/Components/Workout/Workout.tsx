import React from "react";
import { Routes, Route } from "react-router-dom";

import WorkoutHome from "./WorkoutHome/WorkoutHome";
import CreateRoutine from "./WorkoutRoutine/CreateRoutine/CreateRoutine";
import AddExercise from "./WorkoutRoutine/AddExercise/AddExercise";

const Workout: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<WorkoutHome />} />
      <Route path="/routine/create" element={<CreateRoutine />} />
      <Route path="/routine/addexercise" element={<AddExercise />} />
    </Routes>
  );
};

export default Workout;
