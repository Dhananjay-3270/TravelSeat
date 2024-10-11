import "./Booking.css";
import Tobus from "../../assets/To_bus.png";
import Frombus from "../../assets/From Bus.png";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { routeKey } from "../../Data/db";
import Buscard from "./Bus/Buscard";
import { useContext, useState, useRef } from "react";
import datacontext from "../../Context";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

export const Booking = () => {
  const [showbus, setShowbus] = useState(false);
  const [Routeindex, setRouteindex] = useState(0);
  const busSectionRef = useRef(null);

  const { destination, setDestination, From, Too, setFrom, setToo, Bookingdata, setBookingdata } = useContext(datacontext);

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
    <>
      <div className="hero-section">
        <p className="hero-heading">
          India's No. 1 Online Bus Ticket Booking Site
        </p>
        <div className="select-container">
          <i>
            <img src={Tobus} alt="To bus" className="to-bus" />
          </i>
          <select className="select" onChange={handlefrom} value={From}>
            <option value="">{From || "Please Select departure"}</option>
            {destination.map((dest, index) => (
              <option value={dest.value} key={index}>
                {dest.name}
              </option>
            ))}
          </select>
          <FaArrowRightArrowLeft />
          <select className="select" onChange={handledestination} value={Too}>
            <option value="">{Too || "Please select a destination"}</option>
            {destination.map((dest, index) => (
              <option value={dest.value} key={index}>
                {dest.name}
              </option>
            ))}
          </select>
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
          <Buscard showbus={showbus} setShowbus={setShowbus} Routeindex={Routeindex} />
        </div>
      )}

      {/* Display Booking Data */}
      {Bookingdata && Bookingdata.length > 0 && (
        <div className="booking-data-section">
          <h2>Your Booking Details</h2>
          <div className="booking-data-container">
            {Bookingdata.map((booking, index) => (
              <div className="booking-card" key={index}>
                <p><strong>Name:</strong> {booking.name}</p>
                <p><strong>Age:</strong> {booking.age}</p>
                <p><strong>Phone:</strong> {booking.phone}</p>
                <p><strong>From:</strong> {booking.from}</p>
                <p><strong>To:</strong> {booking.too}</p>
                <p><strong>Total Cost:</strong> ₹{booking.totalCost}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Booking;
