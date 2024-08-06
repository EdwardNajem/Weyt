import React from "react";
import styles from "./ExerciseCard.module.css";

type ExerciseProps = {
  exercise: {
    name: string;
    primaryMuscle: string;
    type: string;
    image: string;
  };
};

const ExerciseCard: React.FC<ExerciseProps> = ({ exercise }) => {
  return (
    <div>
      <div className={styles.heaader}>
        <img
          src={exercise.image}
          alt={exercise.name}
          className={styles.image}
        />
        <div>
          <div className={styles.name}>{exercise.name}</div>
          <div className={styles.muscle}>{exercise.primaryMuscle}</div>
        </div>
      </div>
      <div>sets</div>
    </div>
  );
};

export default ExerciseCard;
