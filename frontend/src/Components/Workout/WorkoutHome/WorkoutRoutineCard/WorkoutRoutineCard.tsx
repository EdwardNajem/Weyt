import React from "react";
import { Card, Button } from "react-bootstrap";
import styles from "./WorkoutRoutineCard.module.css"; // Create this CSS file for styling

type WorkoutRoutineCardProps = {
  title: string;
  numberOrder: number;
  onEdit: () => void;
  onDelete: () => void;
  onStart:() => void;
};

const WorkoutRoutineCard: React.FC<WorkoutRoutineCardProps> = ({
  title,
  numberOrder,
  onEdit,
  onDelete,
  onStart,
}) => {
  return (
    <Card className={`text-light bg-dark ${styles.card}`}>
      <Card.Body>
        <Card.Title>{numberOrder + ". " + title}</Card.Title>
        <div className={styles.buttonContainer}>
          <Button variant="secondary" onClick={onEdit}>
            Edit
          </Button>
          <Button variant="danger" onClick={onDelete}>
            Delete
          </Button>
          <button className={styles.startButton} onClick={onStart}>
            Start
          </button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default WorkoutRoutineCard;
