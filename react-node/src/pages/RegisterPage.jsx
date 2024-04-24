import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterPage.css";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

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
  const [errorMessage, setErrorMessage] = useState("");

  // register

  return (
    <>
      <Navbar></Navbar>
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
              style={{ color: "white" }}
              onChange={(e) => {}}
            ></input>
          </div>
          <div className="password_container">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              style={{ color: "white" }}
              onChange={(e) => {}}
            ></input>
          </div>
          <br />
          <button className="button" type="submit" style={{ color: "black" }}>
            Sign Up
          </button>
          <br />

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
