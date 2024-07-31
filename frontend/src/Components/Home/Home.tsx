import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import SidePanel from "../SidePanel/SidePanel";
import styles from "./Home.module.css";

const Home: React.FC = () => {
  return (
    <Container className={styles.mainContainer}>
      <Row className={styles.mainRow}>
        {/* Side Panel */}
        <SidePanel />
        {/* The Pages */}
        <Col xs={10} className={styles.mainColumn}>Home Page</Col>
      </Row>
    </Container>
  );
};

export default Home;
