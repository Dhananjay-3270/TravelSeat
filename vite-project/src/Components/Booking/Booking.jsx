import "./Booking.css";
import Tobus from "../../assets/To_bus.png";
import Frombus from "../../assets/From Bus.png";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import Seatview from "./Seatview";
import Buscard from "./Bus/Buscard";
import { useContext, useState } from "react";
import { datacontext } from "../../App";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
export const Booking = () => {
  const [From, setFrom] = useState("");
  const [Too, setToo] = useState("");
  const [showbus, setShowbus] = useState(false);

  const { businformation, setbusinformation, destination, setDestination } =
    useContext(datacontext);
  const handlesearch = () => {
    if (From && Too && From !== Too) {
      setShowbus(true);
    } else {
      enqueueSnackbar("Please Enter valid Endpoints", { variant: "error" });
    }
  };
  const handledestination = (event) => {
    setToo(event.target.value);
  };
  const handlefrom = (event) => {
    setFrom(event.target.value);
  };
  return (
    <>
      <SnackbarProvider>
        <div className="hero-section">
          <div className="select-container">
            <i>
              <img src={Tobus} alt="To bus" className="to-bus" />
            </i>
            <select className="select" onChange={() => handlefrom(event)}>
              <option value="">From</option>
              {destination.map((dest, index) => (
                <option value={dest.value} key={index}>
                  {dest.name}
                </option>
              ))}
            </select>
            <FaArrowRightArrowLeft />
            <select
              className="select"
              onChange={() => handledestination(event)}
            >
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
              <button
                className="search-result-btn"
                onClick={() => handlesearch()}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        {showbus && <Buscard showbus={showbus} setShowbus={setShowbus} />}
      </SnackbarProvider>
    </>
  );
};

export default Booking;
