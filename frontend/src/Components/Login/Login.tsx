import React, { useCallback, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./Login.module.css";

type LoginData = {
  email: string;
  password: string;
};

const app = 1;

const Login = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const [loginData, setLoginData] = useState<LoginData>();
  const [error, setError] = useState<{ field: string; message: string } | null>(
    null
  );

    const handleLogin = useCallback(() => {
      setError(null);
      const email = emailInputRef.current?.value || "";
      const password = passwordInputRef.current?.value || "";

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      setLoginData({ email, password });

      if (!email) {
        setError({ field: "email", message: "Email is required." });
        return;
      }

      if (!emailPattern.test(email)) {
        setError({
          field: "email",
          message: "Please enter a valid email address.",
        });
        return;
      }

      if (!password) {
        setError({ field: "password", message: "Password is required." });
        return;
      }

      // Add the logic for handling login here, e.g., API call
    }, []);

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") handleLogin();
    },
    [handleLogin]
  );

  return (
    <Container fluid className={styles.MainContainer}>
      <Row className={`mx-0 my-0 ${styles.MainRow}`}>
        {/* Form Column */}
        <Col className={styles.loginColumn} lg={6} xs={12}>
          <div className={styles.MainColumn}>
            <h2 className="logoFont">Weyt</h2>
            <h4 className="logoFont mb-5 text-nowrap">The Way To Progress</h4>
            <h3 className={styles.LoginText}>Log into your account</h3>
            <div className={styles.loginFormContainer}>
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className={`form-control ${styles.loginInput} ${
                  error?.field === "email" ? styles.errorInput : ""
                }`}
                id="email"
                ref={emailInputRef}
                aria-invalid={error?.field === "email"}
                aria-describedby={error?.field === "email" ? "emailError" : ""}
              />
              {error?.field === "email" && (
                <div id="emailError" className={styles.errorMessage}>
                  {error.message}
                </div>
              )}
            </div>
            <div className={styles.loginFormContainer}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className={`form-control ${styles.loginInput} ${
                  error?.field === "password" ? styles.errorInput : ""
                }`}
                id="password"
                ref={passwordInputRef}
                onKeyDown={handleKeyPress}
                aria-invalid={error?.field === "password"}
                aria-describedby={
                  error?.field === "password" ? "passwordError" : ""
                }
              />
              {error?.field === "password" && (
                <div id="passwordError" className={styles.errorMessage}>
                  {error.message}
                </div>
              )}
            </div>
            <button className={styles.SubmitButton} onClick={handleLogin}>
              Login
            </button>
          </div>
        </Col>
        {/* Image Column */}
        <Col className={styles.imageColumn} lg={6}>
          <video
            src="Comp_8.mp4"
            className={styles.VideoComponent}
            autoPlay
            muted
            loop
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
