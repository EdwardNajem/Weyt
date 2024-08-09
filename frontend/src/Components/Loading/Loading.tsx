import React from "react";
import styles from "./Loading.module.css";

const Loading: React.FC = () => {
  return (
    <div className={styles.dotspinner}>
      <div className={styles.dotspinner__dot} />
      <div className={styles.dotspinner__dot} />
      <div className={styles.dotspinner__dot} />
      <div className={styles.dotspinner__dot} />
      <div className={styles.dotspinner__dot} />
      <div className={styles.dotspinner__dot} />
      <div className={styles.dotspinner__dot} />
      <div className={styles.dotspinner__dot} />
    </div>
  );
};
export default Loading;
