import { useState, createContext } from "react";
import "./App.css";
import { busdata, destinations } from "./Data/db";
import Booking from "./Components/Booking/Booking";
import Navbar from "./Components/Navbar/Navbar";
import datacontext from "./Context";
import { SnackbarProvider } from "notistack";

function App() {
  // State to hold the bus information data, initially set to busdata from the database
  const [businformation, setbusinformation] = useState(busdata);

  // State to hold destination options, initially set to destinations from the database
  const [destination, setDestination] = useState(destinations);

  // State to store all the booking details for the application
  const [Bookingdata, setBookingdata] = useState([]);

  // State to manage the departure point selected by the user
  const [From, setFrom] = useState("");

  // State to manage the destination selected by the user
  const [Too, setToo] = useState("");

  /**
   * Function to reset the selected departure and destination points.
   * Useful when resetting form inputs or clearing user selection.
   */
  const resetSelection = () => {
    setFrom("");
    setToo("");
  };

  return (
    <>
      {/* Context provider to make the bus and booking data available throughout the app */}
      <datacontext.Provider
        value={{
          businformation,
          setbusinformation,
          destination,
          setDestination,
          From,
          setFrom,
          Too,
          setToo,
          resetSelection,
          Bookingdata,
          setBookingdata,
        }}
      >
        {/* SnackbarProvider provides notifications (snackbars) throughout the app */}
        <SnackbarProvider>
          <div className="container">
            {/* The Navbar component provides navigation and branding at the top */}
            <Navbar />
            {/* The Booking component handles the bus booking functionality */}
            <Booking />
          </div>
        </SnackbarProvider>
      </datacontext.Provider>
    </>
  );
}

export { App };
