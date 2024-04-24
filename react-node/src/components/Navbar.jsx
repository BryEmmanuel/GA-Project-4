import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <header className="Navbar">
        <nav className="navbar_container">
          <Link to="/main">
            <img
              src="https://fontmeme.com/permalink/240424/1d655b74a01d07a0608a7ed82246054d.png"
              className="logo"
            />
          </Link>
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
