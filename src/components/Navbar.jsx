import React, { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav>
      <section className="Navbar">
        <div className="studio">
          <h1>
            <img src="/" alt="" />
            <a href="/">Baby Studio</a>
          </h1>
        </div>

        <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <div className={`navlist ${isOpen ? "active" : ""}`}>
          <h2>
            <a href="/">Home</a>
          </h2>
          <h2>
            <a
              href="/#our-work"
              onClick={(e) => {
                e.preventDefault();
                const section = document.getElementById("our-work");
                if (window.location.pathname !== "/") {
                  window.location.href = "/#our-work";
                } else if (section) {
                  section.scrollIntoView({ behavior: "smooth" });
                }
                setIsOpen(false); 
              }}
            >
              Our Work
            </a>
          </h2>

          {/* <div className="dropdown">
            <h2>Baby Themes ▾</h2> */}
          {/* <div className="dropdown-content">
              <ul>
                <li>
                  <a href="/#">Christmas</a>
                </li>
                <li>
                  <a href="/#">Harry Potter</a>
                </li>
                <li>
                  <a href="/#">Army Theme</a>
                </li>
                <li>
                  <a href="/#">Radha Krishna</a>
                </li>
              </ul>
            </div> */}
          {/* </div> */}
          <h2>
            <a href="/creative">Creative</a>
          </h2>
          <h2>
            <a href="/contact-us">Contact</a>
          </h2>
        </div>
      </section>
    </nav>
  );
}

export default Navbar;
