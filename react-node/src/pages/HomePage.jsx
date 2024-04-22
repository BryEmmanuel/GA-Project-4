import React from "react";
import "./HomePage.css";
import Navbar from "../components/Navbar";
import SideNavBar from "../components/SideNavBar";

const HomePage = () => {
  return (
    <>
      <Navbar></Navbar>
      <SideNavBar></SideNavBar>
      <div className="homepage_container">Homepage</div>
    </>
  );
};

export default HomePage;
