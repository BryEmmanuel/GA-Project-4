import React, { useContext, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import "./RegisterPage.css";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

import { jwtDecode } from "jwt-decode";

const RegisterPage = () => {
  // useFetch
  const fetchData = useFetch();
  // useNavigate
  const navigate = useNavigate();
  // useContext
  const userCtx = useContext(UserContext);

  // track states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState("");
  // track state of empty field
  const [errorMessage, setErrorMessage] = useState("");
  // track state of invalid email
  const [emailError, setEmailError] = useState("");

  // register
  const register = async () => {
    if (!username || !password || !email) {
      setErrorMessage("Please input your username/email/password");
      return;
    }

    // validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // ^ is the start of the string
    // [^\s@]+ checks NOT whitespace or @ symbol from the front part of the @
    // @ checks the presence of the @ symbol
    // [^\s@]+ checks NOT whitespace or @ symbol after the @
    // \. checks for fullstop
    // [^\s@]+ checks NOT whitespace or @ symbol after fullstop
    // $/ checks end of string
    if (!email || !emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    } else {
      setEmailError("");
    }

    const res = await fetchData(
      "/auth/register",
      "PUT",
      { username, email, password, role },
      undefined
    );
    if (res.ok) {
      login();
    }
  };

  // login
  const login = async () => {
    if (!username || !password) {
      setErrorMessage("Please input your username/password");
      return;
    }
    const res = await fetchData(
      "/auth/login",
      "POST",
      { username, password },
      undefined
    );
    if (res.ok) {
      userCtx.setAccessToken(res.data.access);
      const decoded = jwtDecode(res.data.access);
      userCtx.setUsername(decoded.username);
      userCtx.setRole(decoded.role);
      userCtx.setUserId(decoded.user_id);

      navigate("/main");
    } else {
      setUsername("");
      setPassword("");
      setEmail("");
      setRole("");
      setErrorMessage("Incorrect username/password");
    }
  };

  // handle role on change
  const handleRoleOnChange = (e) => {
    setRole(e.target.value);
  };
  return (
    <>
      <div className="register_container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            register();
          }}
        >
          <div className="username_container">
            <h1 className="login">Register</h1>
            <br />
            <label htmlFor="username">Username</label>
            <input
              type="text"
              value={username}
              style={{ color: "white" }}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            ></input>
          </div>
          <div className="email_container">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={email}
              style={{ color: "white" }}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
          </div>
          <div className="password_container">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={password}
              style={{ color: "white" }}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
          </div>
          <div className="role_container">
            <label htmlFor="role">Role</label>
            <select
              type="role"
              value={role}
              style={{ color: "black" }}
              onChange={handleRoleOnChange}
            >
              <option value="">Select Role</option>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <br />
          <button className="button" type="submit" style={{ color: "black" }}>
            Sign Up
          </button>
          <br />
          {errorMessage && (
            <div className="error_message" style={{ color: "#ff0033" }}>
              {errorMessage}
            </div>
          )}
          {emailError && (
            <div className="error_message" style={{ color: "#ff0033" }}>
              {emailError}
            </div>
          )}

          <br />
          <Link to="/login" className="register">
            Already have an account? Sign In!
          </Link>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
