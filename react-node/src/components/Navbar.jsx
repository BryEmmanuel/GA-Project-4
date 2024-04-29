import React, { useContext } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/user";
import { CgProfile } from "react-icons/cg";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";

const Navbar = () => {
  // useContext
  const userCtx = useContext(UserContext);
  // useNavigate
  const navigate = useNavigate();
  // logout
  const handleLogout = () => {
    localStorage.clear("refresh");
    userCtx.setRole("");
    userCtx.setAccessToken("");
  };

  // function for admin to navigate to upload page
  const goToUploadPage = () => {
    navigate("/upload");
  };

  return (
    <>
      {userCtx.role === "User" ? (
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
              <CgProfile style={{ margin: 6 }} />
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  color: "white",
                  paddingRight: 16,
                }}
                onClick={() => {
                  handleLogout();
                }}
              >
                Logout
              </Link>
            </div>
          </nav>
        </header>
      ) : userCtx.role === "Admin" ? (
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
              <FaPlus
                style={{ margin: 6 }}
                onClick={() => {
                  goToUploadPage();
                }}
              />
              <MdAdminPanelSettings style={{ margin: 6 }} />
              <Link
                to="/login"
                style={{
                  textDecoration: "none",
                  color: "white",
                  paddingRight: 16,
                }}
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
                style={{
                  textDecoration: "none",
                  color: "white",
                  paddingRight: 16,
                }}
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
