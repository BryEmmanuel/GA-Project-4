import { useState } from "react";
import "./SideNavBar.css";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { BiConversation } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";

const navItems = ["Home", "Discussion", "Favourites", "Profile", "Logout"];
const navIcons = [
  <IoMdHome />,
  <BiConversation />,
  <FaHeart />,
  <IoPerson />,
  <BiLogOut />,
];

const SideNavBar = () => {
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
              <button key={item} type="button">
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
