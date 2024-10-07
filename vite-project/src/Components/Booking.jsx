// import React from "react";
import "./Booking.css";
import Tobus from "../assets/To_bus.png";
import Frombus from "../assets/From Bus.png";
import { FaArrowRightArrowLeft } from "react-icons/fa6";

export const Booking = () => {
  return (
    <>
      <div className="hero-section">
        <div className="select-container">
          <i>
            <img src={Tobus} alt="To bus" className="to-bus" />
          </i>
          <select className="select">
            <option value="">From</option>
            <option value="mumbai">Mumbai</option>
            <option value="pune">Pune</option>
            <option value="solapur">Solapur</option>
            <option value="latur">Latur</option>
          </select>
          <FaArrowRightArrowLeft />
          <select className="select">
            <option value="">To</option>
            <option value="mumbai">Mumbai</option>
            <option value="pune">Pune</option>
            <option value="solapur">Solapur</option>
            <option value="latur">Latur</option>
          </select>
          <i>
            <img src={Frombus} alt="From bus" className="to-bus" />
          </i>
          <div className="search-result">
            <button className="search-result-btn">Search</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Booking;
