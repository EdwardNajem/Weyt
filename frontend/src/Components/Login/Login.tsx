import React, { useCallback, useEffect, useRef, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./Login.module.css";
import { NavLink, useNavigate } from "react-router-dom";

type LoginData = {
  email: string;
  password: string;
};

const Login = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const [loginData, setLoginData] = useState<LoginData>();
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<{ field: string; message: string } | null>(
    null
  );
  const navigate = useNavigate();

  useEffect(() => {
    const token = secureLocalStorage.getItem("token");

    if (token) {
      navigate("/home");
    }
  }, []);

  const handleLogin = useCallback(async () => {
    setError(null);
    setLoading(true);
    const email = emailInputRef.current?.value || "";
    const password = passwordInputRef.current?.value || "";

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    setLoginData({ email, password });

    if (!email) {
      setError({ field: "email", message: "Email is required." });
      setLoading(false);
      return;
    }

    if (!emailPattern.test(email)) {
      setError({
        field: "email",
        message: "Please enter a valid email address.",
      });
      setLoading(false);
      return;
    }

    if (!password) {
      setError({ field: "password", message: "Password is required." });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5022/api/User/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      console.log("Login successful", data);
      secureLocalStorage.setItem("token", data.token);
    } catch (error2: any) {
      setError({
        field: "General",
        message: "Login failed: " + error2.message,
      });
    }
    setLoading(false);
  }, []);

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") handleLogin();
    },
    [handleLogin]
  );

  return (
    <Container fluid className={styles.mainContainer}>
      <Row className={`mx-0 my-0 ${styles.mainRow}`}>
        {/* Form Column */}
        <Col className={styles.loginColumn} lg={6} xs={12}>
          <div className={styles.mainColumn}>
            <h2 className="logoFont">Weyt</h2>
            <h4 className="logoFont mb-5 text-nowrap">The Way To Progress</h4>
            <h3 className={styles.loginText}>Log into your account</h3>
            <div className={styles.loginFormContainer}>
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className={`form-control ${styles.loginInput} ${
                  error?.field === "email" ? styles.errorInput : ""
                } ${loading ? "opacity-25" : ""}`}
                id="email"
                ref={emailInputRef}
                aria-invalid={error?.field === "email"}
                aria-describedby={error?.field === "email" ? "emailError" : ""}
                disabled={loading}
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
                } ${loading ? "opacity-25" : ""}`}
                id="password"
                ref={passwordInputRef}
                onKeyDown={handleKeyPress}
                aria-invalid={error?.field === "password"}
                aria-describedby={
                  error?.field === "password" ? "passwordError" : ""
                }
                disabled={loading}
              />
              {error?.field === "password" && (
                <div id="passwordError" className={styles.errorMessage}>
                  {error.message}
                </div>
              )}
            </div>
            {error?.field === "General" && (
              <div className={styles.errorMessage}>{error.message}</div>
            )}
            <button
              className={`${loading ? "opacity-25" : ""} ${
                styles.submitButton
              } `}
              onClick={handleLogin}
              disabled={loading}
            >
              Login
            </button>
            <div className={styles.createAccountContainer}>
              <span>Don't have an account? </span>
              <NavLink to="/signup">Create Account</NavLink>
            </div>
          </div>
        </Col>
        <Col className={styles.imageColumn} lg={6}>
          <video
            src="Comp_8.mp4"
            className={styles.videoComponent}
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
