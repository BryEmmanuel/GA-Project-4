import { useState } from "react";
import "./SideNavBar.css";

const navItems = ["Home", "Discussion", "Favourites", "Profile", "Logout"];

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
              {isOpen ? "close" : "menu"}
            </button>
          </header>
          <nav>
            {navItems.map((item) => (
              <button key={item} type="button">
                <p>{item}</p>
              </button>
            ))}
          </nav>
        </div>
      </aside>
    </section>
  );
};

export default SideNavBar;
