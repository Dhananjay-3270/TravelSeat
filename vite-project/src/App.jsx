import { useState, createContext } from "react";
import "./App.css";
import { busdata, destinations } from "./Data/db";
import Booking from "./Components/Booking/Booking";
import Navbar from "./Components/Navbar/Navbar";
const datacontext = createContext();
function App() {
  const [businformation, setbusinformation] = useState(busdata);
  const [destination, setDestination] = useState(destinations);

  return (
    <>
      <datacontext.Provider
        value={{
          businformation,
          setbusinformation,
          destination,
          setDestination,
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

export { App, datacontext };
