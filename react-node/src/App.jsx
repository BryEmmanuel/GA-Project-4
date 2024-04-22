import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import KdramaPage from "./pages/KdramaPage";
import Discussion from "./pages/Discussion";
import Profile from "./pages/Profile";
import useFetch from "./hooks/useFetch";
import UserContext from "./context/user";

function App() {
  // track state of account
  const [accessToken, setAccessToken] = useState("");
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");

  // useFetch
  const fetchData = useFetch();

  return (
    <>
      <UserContext.Provider
        value={{
          accessToken,
          setAccessToken,
          role,
          setRole,
          username,
          setUsername,
        }}
      >
        <Routes>
          <Route path="/" element={<Navigate replace to="/main" />}></Route>
          <Route path="main" element={<HomePage />}></Route>
          <Route path="login" element={<LoginPage />}></Route>
          <Route path="register" element={<RegisterPage />}></Route>
          <Route path="main/:kdrama" element={<KdramaPage />}></Route>
          <Route path="discussion" element={<Discussion />}></Route>
          <Route path="profile" element={<Profile />}></Route>
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
