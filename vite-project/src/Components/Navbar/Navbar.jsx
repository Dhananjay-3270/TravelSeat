// import React from "react";
import { FaBusSimple } from "react-icons/fa6";
import busLogo from "../../assets/bus.jpg";
import "./Navbar.css";

export const Navbar = () => {
  return (
    <>
      <nav>
        <div className="navbar">
          <div>
            <img src={busLogo} alt="Bus Logo" className="bus-logo" />
          </div>

          <ul className="nav-list">
            <li className="nav-link-active">
              <FaBusSimple className="nav-icon" />
              <span>Bus Tickets</span>
            </li>
            <li className="nav-link">Help</li>
            <li className="nav-account-link">Account</li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
