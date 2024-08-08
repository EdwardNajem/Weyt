import React from "react";
import { Col } from "react-bootstrap";

import styles from "./Home.module.css";

const Home: React.FC = () => {
  return (
    <Col className={styles.mainColumn}>
      <div className={`logoFont ${styles.title}`}>
        Home Page
      </div>
    </Col>
  );
};

export default Home;
