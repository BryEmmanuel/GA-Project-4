import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <>
      <header className="Navbar">
        <nav className="navbar_container">
          <div className="logo">logo</div>
          <div className="searchbar_container">
            <input className="searchbar" placeholder="Search"></input>
          </div>
          <div className="login">login</div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
