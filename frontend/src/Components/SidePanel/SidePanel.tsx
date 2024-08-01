import React, { useCallback } from "react";
import secureLocalStorage from "react-secure-storage";
import { useNavigate } from "react-router-dom";

import { Row, Col } from "react-bootstrap";
import { GoHome } from "react-icons/go";
import { RiLogoutBoxLine } from "react-icons/ri";
import { CiDumbbell } from "react-icons/ci";

import styles from "./SidePanel.module.css";

const SidePanel: React.FC = () => {
  const navigate = useNavigate();

  const handleSignOut = useCallback(() => {
    secureLocalStorage.clear();
    navigate("/login");
  }, []);

  return (
    <Col xs={2} className={styles.mainColumn}>
      <Row className={`logoFont ${styles.logoDisplayRow}`}>Weyt</Row>
      <Row className={styles.itemRow}>
        <div className={styles.iconText}>
          <GoHome size={20} />
          <h5>Home</h5>
        </div>
      </Row>
      <Row className={styles.itemRow}>
        <div className={styles.iconText}>
          <CiDumbbell size={20} />
          <h5>Workout</h5>
        </div>
      </Row>
      <Row className={styles.itemRow}>
        <div className={styles.iconText} onClick={handleSignOut}>
          <RiLogoutBoxLine size={20} />
          <h5>Sign Out</h5>
        </div>
      </Row>
    </Col>
  );
};

export default SidePanel;
