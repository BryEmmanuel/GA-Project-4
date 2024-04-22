import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import KdramaPage from "./pages/KdramaPage";
import Discussion from "./pages/Discussion";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import SideNavBar from "./components/SideNavBar";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate replace to="/main" />}></Route>
        <Route path="main" element={<HomePage />}></Route>
        <Route path="login" element={<LoginPage />}></Route>
        <Route path="register" element={<RegisterPage />}></Route>
        <Route path="main/:kdrama" element={<KdramaPage />}></Route>
        <Route path="discussion" element={<Discussion />}></Route>
        <Route path="profile" element={<Profile />}></Route>
      </Routes>
    </>
  );
}

export default App;
