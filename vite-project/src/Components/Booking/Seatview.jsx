import { useContext, useState } from "react";
import { datacontext } from "../../App";
import single from "../../assets/single.png";
import double from "../../assets/double.png";
import Modal from "../Modal/Modal";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import "./Seatview.css";

const Seatview = ({ id }) => {
  const [showmodal, setShowmodal] = useState(false);
  const [Selectedbusid, setSelectedbusid] = useState([]);
  const { businformation, setbusinformation } = useContext(datacontext);

  const handleproceedtobook = () => {
    if (!(Selectedbusid.length == 0)) {
      setShowmodal(true);
    } else {
      enqueueSnackbar("Please select atleat one seat", {
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
      console.log(Selectedbusid);
    }
  };
  const handleSubmit = (formData) => {
    const updatedBusinformation = businformation.map((bus) => {
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
    setbusinformation(updatedBusinformation);
    setSelectedbusid([]);
    console.log(formData)
  };
  return (
    <>
      <SnackbarProvider>
        <div className="seat-view-container">
          <div className="seat-grid">
            {businformation
              .filter((bus) => bus.busId === id)
              .map((bus) =>
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
