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
  // State to control whether the bus list should be shown or not
  const [showbus, setShowbus] = useState(false);

  // State to store the index of the selected route based on 'From' and 'Too'
  const [Routeindex, setRouteindex] = useState(0);

  // Ref to scroll into view after a successful bus search
  const busSectionRef = useRef(null);

  // Getting data and functions from context (like selected From, Too, booking data)
  const {
    destination,
    setDestination,
    From,
    Too,
    setFrom,
    setToo,
    Bookingdata,
    setBookingdata
  } = useContext(datacontext);

  /**
   * Handles the search action when user clicks the search button.
   * It checks if valid 'From' and 'Too' destinations are selected.
   * If valid, it sets the bus route index, shows the bus list, and scrolls into the bus section.
   */
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

      // Scroll into the bus section smoothly after a delay
      setTimeout(() => {
        busSectionRef.current.scrollIntoView({ behavior: "smooth" });
      }, 500);
    } else {
      // Error handling: if departure or destination is not selected or are the same
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

  /**
   * Handles the selection of the destination (Too) from the dropdown.
   * It updates the 'Too' state and shows a notification.
   */
  const handledestination = (event) => {
    setToo(event.target.value);
    enqueueSnackbar(`Destination set to ${event.target.value}`, {
      variant: "info",
      autoHideDuration: 3000,
    });
  };

  /**
   * Handles the selection of the departure point (From) from the dropdown.
   * It updates the 'From' state and shows a notification.
   */
  const handlefrom = (event) => {
    setFrom(event.target.value);
    enqueueSnackbar(`Departure point set to ${event.target.value}`, {
      variant: "info",
      autoHideDuration: 3000,
    });
  };

  return (
    <>
      {/* Hero Section for selecting From and To destinations */}
      <div className="hero-section">
        <p className="hero-heading">
          India's No. 1 Online Bus Ticket Booking Site
        </p>
        <div className="select-container">
          <i>
            <img src={Tobus} alt="To bus" className="to-bus" />
          </i>
          {/* Dropdown for selecting the departure point (From) */}
          <select className="select" onChange={handlefrom} value={From}>
            <option value="">{From || "Please Select departure"}</option>
            {destination.map((dest, index) => (
              <option value={dest.value} key={index}>
                {dest.name}
              </option>
            ))}
          </select>
          
          {/* Arrow icon between the dropdowns */}
          <FaArrowRightArrowLeft />
          
          {/* Dropdown for selecting the destination (Too) */}
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

          {/* Search button to trigger the search for buses */}
          <div className="search-result">
            <button className="search-result-btn" onClick={handlesearch}>
              Search
            </button>
          </div>
        </div>
      </div>

      {/* If showbus is true, display the bus card section */}
      {showbus && (
        <div ref={busSectionRef}>
          <Buscard showbus={showbus} setShowbus={setShowbus} Routeindex={Routeindex} />
        </div>
      )}

      {/* Display booking data if available */}
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
