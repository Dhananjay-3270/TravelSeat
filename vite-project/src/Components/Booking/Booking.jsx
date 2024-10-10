import "./Booking.css";
import Tobus from "../../assets/To_bus.png";
import Frombus from "../../assets/From Bus.png";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import {  routeKey } from "../../Data/db";
import Buscard from "./Bus/Buscard";
import { useContext, useState, useRef } from "react";
import datacontext from "../../Context";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

export const Booking = () => {
  const [showbus, setShowbus] = useState(false);
  const [Routeindex, setRouteindex] = useState(0);
  const busSectionRef = useRef(null);

 
  const { destination, setDestination, From, Too, setFrom, setToo } =
    useContext(datacontext);

  const handlesearch = () => {
    if (From && Too && From !== Too) {
      const route = `${From}-${Too}`;
      const id = routeKey.indexOf(route);
      setRouteindex(id);
      setShowbus(true);
      enqueueSnackbar("Buses found successfully!", {
        variant: "success",
        autoHideDuration: 2000,
      });
      setTimeout(() => {
        busSectionRef.current.scrollIntoView({ behavior: "smooth" });
      }, 500);
    } else {
      // Handle error messages
      if (!From) {
        enqueueSnackbar("Please select a departure point.", {
          variant: "warning",
          autoHideDuration: 2000,
        });
      } else if (!Too) {
        enqueueSnackbar("Please select a destination.", {
          variant: "warning",
          autoHideDuration: 2000,
        });
      } else if (From === Too) {
        enqueueSnackbar("Departure and destination cannot be the same.", {
          variant: "error",
          autoHideDuration: 2000,
        });
      }
    }
  };

  const handledestination = (event) => {
    setToo(event.target.value);
    enqueueSnackbar(`Destination set to ${event.target.value}`, {
      variant: "info",
      autoHideDuration: 3000,
    });
  };

  const handlefrom = (event) => {
    setFrom(event.target.value);
    enqueueSnackbar(`Departure point set to ${event.target.value}`, {
      variant: "info",
      autoHideDuration: 3000,
    });
  };

  return (
    <SnackbarProvider>
      <div className="hero-section">
        <p className="hero-heading">
          India's No. 1 Online Bus Ticket Booking Site
        </p>
        <div className="select-container">
          <i>
            <img src={Tobus} alt="To bus" className="to-bus" />
          </i>
          {From && (
            <select className="select" onChange={handlefrom} value={From}>
              <option value="">Please Select departure </option>
              {destination.map((dest, index) => (
                <option value={dest.value} key={index}>
                  {dest.name}
                </option>
              ))}
            </select>
          )}
          <FaArrowRightArrowLeft />
          {Too && (
            <select className="select" onChange={handledestination} value={Too}>
              <option value="">Please Select destination</option>
              {destination.map((dest, index) => (
                <option value={dest.value} key={index}>
                  {dest.name}
                </option>
              ))}
            </select>
          )}
          <i>
            <img src={Frombus} alt="From bus" className="to-bus" />
          </i>
          <div className="search-result">
            <button className="search-result-btn" onClick={handlesearch}>
              Search
            </button>
          </div>
        </div>
      </div>

      {showbus && (
        <div ref={busSectionRef}>
          <Buscard
            showbus={showbus}
            setShowbus={setShowbus}
            Routeindex={Routeindex}
          />
        </div>
      )}
    </SnackbarProvider>
  );
};

export default Booking;
