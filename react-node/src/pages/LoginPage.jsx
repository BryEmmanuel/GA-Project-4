import React, { useContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import { jwtDecode } from "jwt-decode";
import UserContext from "../context/user";
import { useNavigate } from "react-router-dom";

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
  const [alert, setAlert] = useState(false);

  // login
  const login = async () => {
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
      setAlert(true);
    }
  };

  return (
    <>
      <div className="login_container">
        <div className="login">
          <input
            type="text"
            placeholder="Username"
            style={{ color: "black" }}
            onChange={(e) => {
              setUsername(e.target.value);
              setAlert(false);
            }}
          ></input>
          <input
            type="password"
            placeholder="Password"
            style={{ color: "black" }}
            onChange={(e) => {
              setPassword(e.target.value);
              setAlert(false);
            }}
          ></input>
          <button type="submit" onClick={login}>
            Login
          </button>
        </div>
        {alert && <div>Incorrect username/password</div>}
      </div>
    </>
  );
};

export default LoginPage;
