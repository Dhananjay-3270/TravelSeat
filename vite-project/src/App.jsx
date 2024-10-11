import { useState, createContext } from "react";
import "./App.css";
import { busdata, destinations } from "./Data/db";
import Booking from "./Components/Booking/Booking";
import Navbar from "./Components/Navbar/Navbar";
import datacontext from "./Context";
import { SnackbarProvider } from "notistack";
function App() {
  const [businformation, setbusinformation] = useState(busdata);
  const [destination, setDestination] = useState(destinations);
  const [Bookingdata, setBookingdata] = useState([]);
  const [From, setFrom] = useState("");
  const [Too, setToo] = useState("");
  const resetSelection = () => {
    setFrom("");
    setToo("");
  };
  return (
    <>
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
          setBookingdata
        }}
      >
        <SnackbarProvider>
          <div className="container">
            <Navbar />
            <Booking />
          </div>
        </SnackbarProvider>
      </datacontext.Provider>
    </>
  );
}

export { App };
