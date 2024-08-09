import React, { useCallback } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";

import styles from "./ExerciseCard.module.css";

type Set = {
  reps?: number;
  weight?: number;
  time?: string;
};

type ExerciseProps = {
  exercise: {
    id: number;
    name: string;
    primaryMuscle: string;
    type: string;
    image: string;
  };
  sets: Set[];
  onRemove: () => void;
  onAddSet: () => void;
  onRemoveSet: (index: number) => void;
  onSetChange: (index: number, field: string, value: string | number) => void;
};

const ExerciseCard: React.FC<ExerciseProps> = ({
  exercise,
  sets,
  onRemove,
  onAddSet,
  onRemoveSet,
  onSetChange,
}) => {
  const renderSetHeaders = useCallback(
    (items: string[]) => (
      <div className={styles.setHeader}>
        {items.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
        <button className={styles.addButton} onClick={onAddSet}>
          Add
        </button>
      </div>
    ),
    [onAddSet]
  );

  const renderSetDetails = useCallback(
    (set: Set, index: number) => {
      switch (exercise.type) {
        case "Bodyweight Reps":
          return (
            <div key={index} className={styles.setItem}>
              <div>{index + 1}</div>
              <input
                type="number"
                inputMode="numeric"
                placeholder={set.reps?.toString()}
                onChange={(e) =>
                  onSetChange(index, "reps", parseInt(e.target.value))
                }
                className={styles.inputSet}
              />
              <TiDeleteOutline
                size={28}
                className={styles.deleteSet}
                onClick={() => onRemoveSet(index)}
              />
            </div>
          );
        case "Weight & Distance":
          return (
            <div key={index} className={styles.setItem}>
              <div>{index + 1}</div>
              <input
                type="number"
                placeholder={set.weight?.toString()}
                onChange={(e) =>
                  onSetChange(index, "weight", parseFloat(e.target.value))
                }
                className={styles.inputSet}
              />
              <input
                type="text"
                placeholder={set.time}
                pattern="^([0-1][0-9]|2[0-3]):([0-5][0-9])$"
                inputMode="numeric"
                onChange={(e) => onSetChange(index, "time", e.target.value)}
                className={styles.inputSet}
              />
              <TiDeleteOutline
                size={28}
                className={styles.deleteSet}
                onClick={() => onRemoveSet(index)}
              />
            </div>
          );
        case "Weight & Reps":
        case "Weighted Bodyweight":
        case "Assisted Bodyweight":
          return (
            <div key={index} className={styles.setItem}>
              <div>{index + 1}</div>
              <input
                type="number"
                placeholder={set.weight?.toString()}
                onChange={(e) =>
                  onSetChange(index, "weight", parseFloat(e.target.value))
                }
                className={styles.inputSet}
              />
              <input
                type="number"
                placeholder={set.reps?.toString()}
                onChange={(e) =>
                  onSetChange(index, "reps", parseInt(e.target.value))
                }
                className={styles.inputSet}
              />
              <TiDeleteOutline
                size={28}
                className={styles.deleteSet}
                onClick={() => onRemoveSet(index)}
              />
            </div>
          );
        case "Duration":
          return (
            <div key={index} className={styles.setItem}>
              <div>{index + 1}</div>
              <input
                type="text"
                placeholder={set.time}
                pattern="^([0-1][0-9]|2[0-3]):([0-5][0-9])$"
                inputMode="numeric"
                onChange={(e) => onSetChange(index, "time", e.target.value)}
                className={styles.inputSet}
              />
              <TiDeleteOutline
                size={28}
                className={styles.deleteSet}
                onClick={() => onRemoveSet(index)}
              />
            </div>
          );
        default:
          return null;
      }
    },
    [exercise.type, onRemoveSet, onSetChange]
  );

  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <img
          src={exercise.image}
          alt={exercise.name}
          className={styles.image}
        />
        <div>
          <div className={styles.name}>{exercise.name}</div>
          <div className={styles.muscle}>{exercise.primaryMuscle}</div>
        </div>
        <FaTrashAlt size={20} className={styles.delete} onClick={onRemove} />
      </div>
      {renderSetHeaders(
        exercise.type === "Bodyweight Reps"
          ? ["Set", "Reps"]
          : exercise.type === "Weight & Distance"
          ? ["Set", "Kg", "Time"]
          : exercise.type === "Weight & Reps" ||
            exercise.type === "Weighted Bodyweight" ||
            exercise.type === "Assisted Bodyweight"
          ? ["Set", "Kg", "Reps"]
          : exercise.type === "Duration"
          ? ["Set", "Time"]
          : []
      )}
      {sets.map((set, index) => renderSetDetails(set, index))}
    </div>
  );
};

export default ExerciseCard;
