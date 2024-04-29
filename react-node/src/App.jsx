import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import KdramaPage from "./pages/KdramaPage";
import Discussion from "./pages/Discussion";
import Profile from "./pages/Profile";
import useFetch from "./hooks/useFetch";
import UserContext from "./context/user";
import { jwtDecode } from "jwt-decode";
import Favourites from "./pages/Favourites";
import Comments from "./pages/Comments";

function App() {
  // track state of account
  const [accessToken, setAccessToken] = useState("");
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");

  // useFetch
  const fetchData = useFetch();

  // user access to app after certain period of time
  const access = async () => {
    const refreshToken = localStorage.getItem("refresh");

    if (!refreshToken) {
      console.error("No refresh token found");
      return;
    }
    try {
      const res = await fetchData(
        "/auth/refresh",
        "POST",
        { refresh: refreshToken },
        undefined
      );
      if (res.ok) {
        setAccessToken(res.data.access);
        const decoded = jwtDecode(res.data.access);
        setRole(decoded.role);
        setUsername(decoded.username);
        setUserId(decoded.user_id);
      } else {
        console.error("Failed to refresh access token:");
      }
    } catch (error) {
      console.error("Error refreshing access token:");
    }
  };

  useEffect(() => {
    access();
  }, []);

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
          userId,
          setUserId,
        }}
      >
        <Routes>
          <Route path="/" element={<Navigate replace to="/main" />}></Route>
          <Route path="main" element={<HomePage />}></Route>
          <Route path="login" element={<LoginPage />}></Route>
          <Route path="register" element={<RegisterPage />}></Route>
          <Route path="main/:kdrama" element={<KdramaPage />}></Route>
          <Route path="discussion" element={<Discussion />}></Route>
          <Route path="discussion/comments/:id" element={<Comments />}></Route>
          <Route path="profile" element={<Profile />}></Route>
          <Route path="favourites" element={<Favourites />}></Route>
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
