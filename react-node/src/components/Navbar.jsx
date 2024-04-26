import React, { useContext } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import UserContext from "../context/user";

const Navbar = () => {
  // useContext
  const userCtx = useContext(UserContext);
  // logout
  const handleLogout = () => {
    localStorage.clear("refresh");
    userCtx.setRole("");
    userCtx.setAccessToken("");
    userCtx.setProfilePic("");
  };

  return (
    <>
      {userCtx.role === "user" ? (
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
            <div className="logout">
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "white" }}
                onClick={() => {
                  handleLogout();
                }}
              >
                Logout
              </Link>
            </div>
          </nav>
        </header>
      ) : (
        <header className="Navbar">
          <nav className="navbar_container">
            <Link to="/main">
              <img
                src="https://fontmeme.com/permalink/240424/1d655b74a01d07a0608a7ed82246054d.png"
                className="logo"
              />
            </Link>

            <div className="login">
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "white" }}
              >
                Login
              </Link>
            </div>
          </nav>
        </header>
      )}
    </>
  );
};

export default Navbar;
