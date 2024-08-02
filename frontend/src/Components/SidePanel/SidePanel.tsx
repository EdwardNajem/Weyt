import React, { useCallback } from "react";
import secureLocalStorage from "react-secure-storage";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
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
  }, [navigate]);

  return (
    <Navbar key={"lg"} expand={"lg"} className="navbar-dark bg-dark">
      <Container fluid>
        <Navbar.Brand className="logoFont fs-2 user-select-none">
          Weyt
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls={`offcanvasNavbar-expand-${"lg"}`}
          className="navbar-dark bg-dark"
        />
        <Navbar.Offcanvas
          className="navbar-dark bg-dark"
          id={`offcanvasNavbar-expand-${"lg"}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${"lg"}`}
          placement="start"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title
              className="logoFont fs-2 user-select-none"
              id={`offcanvasNavbarLabel-expand-${"lg"}`}
            >
              Weyt
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3 gap-3">
              <Row className={styles.itemRow} onClick={() => navigate("/home")}>
                <div className={styles.iconText}>
                  <GoHome size={18} />
                  <h5>Home</h5>
                </div>
              </Row>
              <Row
                className={styles.itemRow}
                onClick={() => navigate("/home/workout")}
              >
                <div className={styles.iconText}>
                  <CiDumbbell size={18} />
                  <h5>Workout</h5>
                </div>
              </Row>
              <Row className={styles.itemRow} onClick={handleSignOut}>
                <div className={styles.iconText}>
                  <RiLogoutBoxLine size={18} />
                  <h5>Sign Out</h5>
                </div>
              </Row>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default SidePanel;
