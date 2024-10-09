import "./Booking.css";
import Tobus from "../../assets/To_bus.png";
import Frombus from "../../assets/From Bus.png";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import Seatview from "./Seatview";
import Buscard from "./Bus/Buscard";
import { useContext, useState, useRef } from "react";
import { datacontext } from "../../App";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

export const Booking = () => {
  const [From, setFrom] = useState("");
  const [Too, setToo] = useState("");
  const [showbus, setShowbus] = useState(false);

  const busSectionRef = useRef(null);

  const { businformation, setbusinformation, destination, setDestination } =
    useContext(datacontext);

  const handlesearch = () => {
    if (!From) {
      enqueueSnackbar("Please select a departure point.", {
        variant: "warning",
        autoHideDuration: 3000,
      });
    } else if (!Too) {
      enqueueSnackbar("Please select a destination.", {
        variant: "warning",
        autoHideDuration: 3000,
      });
    } else if (From === Too) {
      enqueueSnackbar("Departure and destination cannot be the same.", {
        variant: "error",
        autoHideDuration: 3000,
      });
    } else {
      setShowbus(true);
      enqueueSnackbar("Buses found successfully!", {
        variant: "success",
        autoHideDuration: 3000,
      });

      setTimeout(() => {
        busSectionRef.current.scrollIntoView({ behavior: "smooth" });
      }, 500); // Adding a slight delay for the UI to update before scrolling
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
      <SnackbarProvider>
        <div className="hero-section">
          <p className="hero-heading">
            Indias No. 1 Online Bus Ticket Booking Site
          </p>
          <div className="select-container">
            <i>
              <img src={Tobus} alt="To bus" className="to-bus" />
            </i>
            <select className="select" onChange={handlefrom}>
              <option value="">From</option>
              {destination.map((dest, index) => (
                <option value={dest.value} key={index}>
                  {dest.name}
                </option>
              ))}
            </select>
            <FaArrowRightArrowLeft />
            <select className="select" onChange={handledestination}>
              <option value="">To</option>
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
              {/* <button className="reset-btn" onClick={handleResetSearch}>
                Reset
              </button> */}
            </div>
          </div>
        </div>

        {/* Bus section */}
        {showbus && (
          <div ref={busSectionRef}>
            <Buscard showbus={showbus} setShowbus={setShowbus} />
          </div>
        )}
      </SnackbarProvider>
    </>
  );
};

export default Booking;
