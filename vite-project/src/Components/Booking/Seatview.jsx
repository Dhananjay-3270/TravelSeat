import { useContext, useState } from "react";
import datacontext from "../../Context";
import single from "../../assets/single.png"; // Image for single seat
import double from "../../assets/double.png"; // Image for double seat
import Modal from "../Modal/Modal"; // Modal component for booking details
import { SnackbarProvider, enqueueSnackbar } from "notistack"; // Snackbar for notifications
import "./Seatview.css"; // CSS file for seat view styling

const Seatview = ({ id, seatview, setSeatview, setShowbus, Routeindex }) => {
  // State for showing the booking modal
  const [showmodal, setShowmodal] = useState(false);

  // State for storing selected seat IDs
  const [Selectedbusid, setSelectedbusid] = useState([]);

  // State for storing seat details like seat type (Single/Double)
  const [Details, setDetails] = useState([]);

  // Extracting data and functions from the context
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

  /**
   * Handles the "Proceed to Book" button click.
   * If no seats are selected, it shows an error notification.
   * If seats are selected, it opens the booking modal.
   */
  const handleproceedtobook = () => {
    if (Selectedbusid.length !== 0) {
      setShowmodal(true); // Open the booking modal
    } else {
      enqueueSnackbar("Please select at least one seat", {
        variant: "error",
        autoHideDuration: 2000, // Auto-hide after 2 seconds
      });
    }
  };

  /**
   * Handles seat selection and deselection.
   * If the seat is already selected, it removes it from the selected seats.
   * Otherwise, it adds the seat to the selected seats list and records its details.
   */
  const handleseat = (seatid, seattype) => {
    const demo = [...Selectedbusid]; // Copy of the selected seats
    const details = { seatid, seattype }; // Create seat details object

    if (demo.includes(seatid)) {
      // If seat is already selected, remove it from both Selectedbusid and Details
      const index = demo.indexOf(seatid);
      demo.splice(index, 1);
      setSelectedbusid(demo); // Update selected seats

      // Remove seat from the details array
      setDetails((prevDetails) =>
        prevDetails.filter((seat) => seat.seatid !== seatid)
      );
    } else {
      // If seat is not selected, add it to both Selectedbusid and Details
      setSelectedbusid((prev) => [...prev, seatid]);
      setDetails((prevDetails) => [...prevDetails, details]);
    }
  };

  /**
   * Handles the form submission after booking.
   * It resets the seat selection, updates the bus information,
   * and stores the booking data in the context.
   */
  const handleSubmit = (formData) => {
    resetSelection(); // Clear current seat selection

    // Update the bus information, marking selected seats as unavailable
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

    // Update the businformation state with the new data
    const newdata = JSON.parse(JSON.stringify(businformation)); // Create a deep copy of businformation
    newdata[Routeindex] = updatedBusinformation;
    setbusinformation(newdata); // Set the new businformation state

    // Clear seat selection and close modals
    setSelectedbusid([]);
    setSeatview(false);
    setShowbus(false);

    // Store the new booking data in Bookingdata
    setBookingdata((prevBookingData) => [...prevBookingData, formData]);
  };

  return (
    <>
      <SnackbarProvider>
        <div className="seat-view-container">
          {/* Display seat grid for the selected bus */}
          <div className="seat-grid">
            {businformation[Routeindex]
              .filter((bus) => bus.busId === id) // Filter the bus by ID
              .map((bus) =>
                bus.seats.map((seat) => (
                  <div
                    key={seat.seatId} // Unique key for each seat
                    className={`${seat.type}-seat${
                      seat.isAvailable && !Selectedbusid.includes(seat.seatId)
                    }`} // Class to show if the seat is available or selected
                    onClick={() => handleseat(seat.seatId, seat.type)} // Handle seat selection
                  >
                    {/* Display the seat icon (Single/Double) */}
                    <img
                      className="seat-icon"
                      src={seat.type === "Single" ? single : double}
                      alt=""
                    />
                  </div>
                ))
              )}
          </div>

          {/* Button to proceed to booking after seat selection */}
          <div>
            <button onClick={() => handleproceedtobook()}>
              Proceed to Book
            </button>
          </div>
        </div>

        {/* Booking modal for seat details and confirmation */}
        {showmodal && (
          <Modal
            show={showmodal} // Show or hide modal
            handleClose={setShowmodal} // Function to close modal
            handleSubmit={handleSubmit} // Function to handle booking submission
            seatdetails={Details} // Pass selected seat details to modal
          />
        )}
      </SnackbarProvider>
    </>
  );
};

export default Seatview;
