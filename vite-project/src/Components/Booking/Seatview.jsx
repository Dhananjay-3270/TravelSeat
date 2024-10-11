import { useContext, useState } from "react";
import datacontext from "../../Context";
import single from "../../assets/single.png";
import double from "../../assets/double.png";
import Modal from "../Modal/Modal";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import "./Seatview.css";

const Seatview = ({ id, seatview, setSeatview, setShowbus, Routeindex }) => {
  const [showmodal, setShowmodal] = useState(false);
  const [Selectedbusid, setSelectedbusid] = useState([]);
  const [Details, setDetails] = useState([]);
  const {
    businformation,
    setbusinformation,
    destination,
    setDestination,
    From,
    Too,
    setBookingdata,
    resetSelection,
  } = useContext(datacontext);

  const handleproceedtobook = () => {
    if (Selectedbusid.length !== 0) {
      setShowmodal(true);
    } else {
      enqueueSnackbar("Please select at least one seat", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  const handleseat = (seatid, seattype) => {
    const demo = [...Selectedbusid];
    const details = { seatid, seattype };

    if (demo.includes(seatid)) {
      // If seat is already selected, remove it from both Selectedbusid and Details
      const index = demo.indexOf(seatid);
      demo.splice(index, 1);
      setSelectedbusid(demo);

      // Remove from Details array
      setDetails((prevDetails) =>
        prevDetails.filter((seat) => seat.seatid !== seatid)
      );
    } else {
      // If seat is not selected, add to both Selectedbusid and Details
      setSelectedbusid((prev) => [...prev, seatid]);
      setDetails((prevDetails) => [...prevDetails, details]);
    }
  };

  const handleSubmit = (formData) => {
    // Clear current seat selection
    resetSelection();

    // Update the bus information with the newly booked seats
    const updatedBusinformation = businformation[Routeindex].map((bus) => {
      if (bus.busId === id) {
        return {
          ...bus,
          seats: bus.seats.map((seat) => {
            if (Selectedbusid.includes(seat.seatId)) {
              return { ...seat, isAvailable: false }; // Mark the seat as unavailable
            }
            return seat;
          }),
        };
      }
      return bus;
    });

    // Update businformation state
    const newdata = JSON.parse(JSON.stringify(businformation)); // Create a deep copy
    newdata[Routeindex] = updatedBusinformation;
    setbusinformation(newdata);

    // Clear seat selection and close modals
    setSelectedbusid([]);
    setSeatview(false);
    setShowbus(false);

    // Add the new booking to Bookingdata
    setBookingdata((prevBookingData) => [...prevBookingData, formData]);
  };

  return (
    <>
      <SnackbarProvider>
        <div className="seat-view-container">
          <div className="seat-grid">
            {businformation[Routeindex].filter((bus) => bus.busId === id).map(
              (bus) =>
                bus.seats.map((seat) => (
                  <div
                    key={seat.seatId}
                    className={`${seat.type}-seat${
                      seat.isAvailable && !Selectedbusid.includes(seat.seatId)
                    }`}
                    onClick={() => handleseat(seat.seatId, seat.type)}
                  >
                    <img
                      className="seat-icon"
                      src={seat.type === "Single" ? single : double}
                      alt=""
                    />
                  </div>
                ))
            )}
          </div>
          <div>
            <button onClick={() => handleproceedtobook()}>
              Proceed to Book
            </button>
          </div>
        </div>
        {showmodal && (
          <Modal
            show={showmodal}
            handleClose={setShowmodal}
            handleSubmit={handleSubmit}
            seatdetails={Details}
          />
        )}
      </SnackbarProvider>
    </>
  );
};

export default Seatview;
