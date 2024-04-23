import React, { useContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import { jwtDecode } from "jwt-decode";
import UserContext from "../context/user";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./LoginPage.css";

const LoginPage = () => {
  // useFetch
  const fetchData = useFetch();
  // useNavigate
  const navigate = useNavigate();
  // useContext
  const userCtx = useContext(UserContext);

  // state to track users
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

      navigate("/main");
    } else {
      setErrorMessage("Incorrect username/password");
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="login_container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            login();
          }}
        >
          <div className="username_container">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              value={username}
              style={{ color: "white" }}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrorMessage("");
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
                setErrorMessage("");
              }}
            ></input>
          </div>
          <button type="submit" style={{ color: "black" }}>
            Login
          </button>

          {errorMessage && <div>{errorMessage}</div>}
        </form>
      </div>
    </>
  );
};

export default LoginPage;
