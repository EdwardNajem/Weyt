import React, { useCallback, useEffect, useRef, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./SignUp.module.css";
import { NavLink, useNavigate } from "react-router-dom";

type SignUpData = {
  name: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
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

  const handleSignUp = useCallback(async () => {
    setError(null);
    setLoading(true);
    
    const name = nameInputRef.current?.value || "";
    const email = emailInputRef.current?.value || "";
    const password = passwordInputRef.current?.value || "";
    const confirmPassword = confirmPasswordInputRef.current?.value || "";

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const signUpData: SignUpData = { name, email, password };

    console.log(name);

    if (name === "" || !name) {
      setError({ field: "name", message: "Name is required." });
      setLoading(false);
      return;
    }

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

    if (password !== confirmPassword) {
      setError({ field: "password2", message: "Passwords should match!." });
      setLoading(false);
      return;
    }

    console.log("SignUp Info:", signUpData);

    try {
      const response = await fetch("http://localhost:5022/api/User/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpData),
      });

      if (!response.ok) {
        throw new Error("SignUp failed");
      }

      const data = await response.json();
      console.log("SignUp successful", data);
      navigate("/login");
    } catch (error: any) {
      setError({
        field: "General",
        message: "SignUp failed: " + error.message,
      });
    }

    setLoading(false);
  }, []);

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") handleSignUp();
    },
    [handleSignUp]
  );

  return (
    <Container fluid className={styles.mainContainer}>
      <Row className={`mx-0 my-0 ${styles.mainRow}`}>
        {/* Form Column */}
        <Col className={styles.signUpColumn} lg={6} xs={12} order-lg={1}>
          <div className={styles.mainColumn}>
            <h2 className="logoFont mb-3 text-nowrap">Weyt</h2>
            <h3 className={styles.signUpText}>Create an account</h3>
            <div className={styles.signUpFormContainer}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className={`form-control ${styles.signUpInput} ${
                  error?.field === "name" ? styles.errorInput : ""
                } ${loading ? "opacity-25" : ""}`}
                id="name"
                ref={nameInputRef}
                aria-invalid={error?.field === "name"}
                aria-describedby={error?.field === "name" ? "nameError" : ""}
                disabled={loading}
              />
              {error?.field === "name" && (
                <div id="nameError" className={styles.errorMessage}>
                  {error.message}
                </div>
              )}
            </div>
            <div className={styles.signUpFormContainer}>
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className={`form-control ${styles.signUpInput} ${
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
            <div className={styles.signUpFormContainer}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className={`form-control ${styles.signUpInput} ${
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
            <div className={styles.signUpFormContainer}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                className={`form-control ${styles.signUpInput} ${
                  error?.field === "confirmPassword" ? styles.errorInput : ""
                } ${loading ? "opacity-25" : ""}`}
                id="confirmPassword"
                ref={confirmPasswordInputRef}
                aria-invalid={error?.field === "password2"}
                aria-describedby={
                  error?.field === "password2" ? "password2Error" : ""
                }
                disabled={loading}
              />
              {error?.field === "password2" && (
                <div id="password2Error" className={styles.errorMessage}>
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
              onClick={handleSignUp}
              disabled={loading}
            >
              Create Account
            </button>
            <div className={styles.createAccountContainer}>
              <span>Already have an account? </span>
              <NavLink to="/login">Sign In</NavLink>
            </div>
          </div>
        </Col>
        <Col className={styles.imageColumn} lg={6} order-lg={2}>
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

export default SignUp;
