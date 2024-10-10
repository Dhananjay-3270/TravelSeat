import { useState, createContext } from "react";
import "./App.css";
import { busdata, destinations } from "./Data/db";
import Booking from "./Components/Booking/Booking";
import Navbar from "./Components/Navbar/Navbar";
import datacontext from "./Context";
function App() {
  const [businformation, setbusinformation] = useState(busdata);
  const [destination, setDestination] = useState(destinations);
  const [From, setFrom] = useState("Please Select departure");
  const [Too, setToo] = useState("Please Select destination");

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
        }}
      >
        <div className="container">
          <Navbar />
          <Booking />
        </div>
      </datacontext.Provider>
    </>
  );
}

export { App };
