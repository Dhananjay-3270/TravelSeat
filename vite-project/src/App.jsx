
import "./App.css";

import Booking from "./Components/Booking/Booking";
import Navbar from "./Components/Navbar/Navbar";
function App() {
  return (
    <>
      <div className="container">
        <Navbar />
        <Booking />
      </div>
    </>
  );
}

export default App;
