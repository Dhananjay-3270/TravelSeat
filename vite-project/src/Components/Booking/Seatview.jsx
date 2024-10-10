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
  const {
    businformation,
    setbusinformation,
    destination,
    setDestination,
    From,
    setFrom,
    Too,
    setToo,
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

  const handleseat = (seatid) => {
    const demo = [...Selectedbusid];
    if (demo.includes(seatid)) {
      const index = demo.indexOf(seatid);
      demo.splice(index, 1);
      setSelectedbusid(demo);
    } else {
      setSelectedbusid((prev) => [...prev, seatid]);
    }
  };

  const handleSubmit = (formData) => {
    const previousFrom = From; // Capture the previous value
    const previousToo = Too; // Capture the previous value

    setFrom("Please Select departure"); // Set From to empty string
    setToo("Please Select destination"); // Set Too to empty string

    const updatedBusinformation = businformation[Routeindex].map((bus) => {
      if (bus.busId === id) {
        return {
          ...bus,
          seats: bus.seats.map((seat) => {
            if (Selectedbusid.includes(seat.seatId)) {
              return { ...seat, isAvailable: false };
            }
            return seat;
          }),
        };
      }
      return bus;
    });
    const newdata = JSON.parse(JSON.stringify(businformation));
    newdata[Routeindex] = updatedBusinformation;
    setbusinformation(newdata);
    setSelectedbusid([]);
    setSeatview(false);
    setShowbus(false);
    console.log("From after update:", From);
    console.log("Too after update:", Too);

    console.log(formData);
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
                    onClick={() => handleseat(seat.seatId)}
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
          />
        )}
      </SnackbarProvider>
    </>
  );
};

export default Seatview;
