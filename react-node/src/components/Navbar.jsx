import React, { useContext, useEffect, useRef, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/user";
import { CgProfile } from "react-icons/cg";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import useFetch from "../hooks/useFetch";

const Navbar = () => {
  // useContext
  const userCtx = useContext(UserContext);
  // useNavigate
  const navigate = useNavigate();
  // useFetch
  const fetchData = useFetch();
  // useRef
  const searchKdramaRef = useRef();

  // state to track all kdramas
  const [allKdramas, setAllKdramas] = useState([]);
  // state to track displayed kdramas
  const [displayedKdrama, setDisplayedKdrama] = useState([]);

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

  // get all kdramas
  const getAllKdrama = async () => {
    console.log(userCtx);
    try {
      const res = await fetchData(
        "/kdrama/getkdrama",
        "GET",
        undefined,
        userCtx.accessToken
      );
      if (res.ok) {
        // only require the names for searching
        const kdramaNames = res.data.map((kdrama) => kdrama.name);
        console.log(kdramaNames);
        setAllKdramas(kdramaNames);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error(error.message);
      }
    }
  };

  // function to handle searching of kdramas
  const handleSearchBar = async () => {
    if (searchKdramaRef.current.value.length > 0) {
      const tempArray = [...allKdramas];
      const filterSearch = tempArray.filter((kdrama) =>
        kdrama
          .toLowerCase()
          .includes(searchKdramaRef.current.value.toLowerCase())
      );
      const sortedFilterSearch = filterSearch.sort((a, b) =>
        a.localeCompare(b)
      );
      setDisplayedKdrama(sortedFilterSearch);
    } else {
      setDisplayedKdrama([]);
    }
  };

  // function to reset search bar
  const resetSearchBar = () => {
    searchKdramaRef.current.value = "";
    handleSearchBar();
  };

  useEffect(() => {
    console.log(displayedKdrama);
    getAllKdrama();
  }, [displayedKdrama]);

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
              <input
                className="searchbar"
                placeholder="Search"
                ref={searchKdramaRef}
                style={{ color: "black" }}
                onKeyUp={() => {
                  handleSearchBar();
                }}
                onBlur={() => {
                  {
                    setTimeout(resetSearchBar, 100);
                  }
                }}
              ></input>
              <div className="dropdown">
                {displayedKdrama.map((kdrama, index) => (
                  <Link
                    to={`/main/${kdrama}`}
                    key={index}
                    className="dropdown-item"
                  >
                    {kdrama}
                  </Link>
                ))}
              </div>
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
              <input
                className="searchbar"
                placeholder="Search"
                ref={searchKdramaRef}
                style={{ color: "black" }}
                onKeyUp={() => {
                  handleSearchBar();
                }}
                onBlur={() => {
                  {
                    setTimeout(resetSearchBar, 100);
                  }
                }}
              ></input>
              <div className="dropdown">
                {displayedKdrama.map((kdrama, index) => (
                  <Link
                    to={`/main/${kdrama}`}
                    key={index}
                    className="dropdown-item"
                  >
                    {kdrama}
                  </Link>
                ))}
              </div>
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
