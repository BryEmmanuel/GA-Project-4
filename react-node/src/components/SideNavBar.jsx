import { useContext, useState } from "react";
import "./SideNavBar.css";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { BiConversation } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/user";

const navItems = ["Home", "Discussion", "Favourites", "Logout"];
const navIcons = [<IoMdHome />, <BiConversation />, <FaHeart />, <BiLogOut />];

const SideNavBar = () => {
  // use Navigate
  const navigate = useNavigate();
  // use Context
  const userCtx = useContext(UserContext);
  // function to handle buttons function
  const handleSideBarButtons = (key) => {
    switch (key) {
      case "Home":
        navigate("/main");
        break;
      case "Discussion":
        navigate("/discussion");
        break;
      case "Favourites":
        navigate("/favourites");
        break;
      case "Logout":
        const handleLogout = () => {
          localStorage.clear("refresh");
          userCtx.setRole("");
          userCtx.setAccessToken("");
          navigate("/login");
        };
        handleLogout();
        break;
    }
  };
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section className="page sidebar-2-page">
      <aside className={`sidebar-2 ${isOpen ? "open" : ""}`}>
        <div className="inner">
          <header>
            <button
              type="button"
              className="sidebar-2-burger"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <IoClose /> : <IoMenu />}
            </button>
          </header>
          <nav>
            {navItems.map((item, index) => (
              <button
                key={item}
                type="button"
                onClick={() => handleSideBarButtons(item)}
              >
                <span style={{ color: "inherit" }}>{navIcons[index]}</span>
                <h6>{item}</h6>
              </button>
            ))}
          </nav>
        </div>
      </aside>
    </section>
  );
};

export default SideNavBar;
